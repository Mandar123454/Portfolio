@description('Location for all resources')
param location string = resourceGroup().location

@description('Base name for resources')
param baseName string = 'mandar-portfolio'

@description('Enable Cosmos DB (true/false)')
param enableCosmos bool = true

@description('Cosmos DB throughput (RU/s)')
@minValue(400)
param cosmosThroughput int = 400

// Storage for Function App
resource sa 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: toLower(replace(baseName, '-', ''))
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
}

// App Insights
resource ai 'Microsoft.Insights/components@2020-02-02' = {
  name: '${baseName}-ai'
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    Flow_Type: 'Bluefield'
  }
}

// Function App Plan (Consumption)
resource plan 'Microsoft.Web/serverfarms@2022-09-01' = {
  name: '${baseName}-plan'
  location: location
  sku: {
    name: 'Y1'
    tier: 'Dynamic'
  }
}

// Function App (Linux, Node 18)
resource func 'Microsoft.Web/sites@2022-09-01' = {
  name: '${baseName}-func'
  location: location
  kind: 'functionapp,linux'
  properties: {
    serverFarmId: plan.id
    siteConfig: {
      linuxFxVersion: 'Node|18'
      appSettings: [
        {
          name: 'AzureWebJobsStorage'
          value: concat('DefaultEndpointsProtocol=https;AccountName=', sa.name, ';EndpointSuffix=', environment().suffixes.storage)
        }
        {
          name: 'FUNCTIONS_EXTENSION_VERSION'
          value: '~4'
        }
        {
          name: 'FUNCTIONS_WORKER_RUNTIME'
          value: 'node'
        }
        {
          name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
          value: ai.properties.InstrumentationKey
        }
      ]
    }
    httpsOnly: true
  }
  identity: {
    type: 'SystemAssigned'
  }
}

// Cosmos DB (optional)
resource cosmos 'Microsoft.DocumentDB/databaseAccounts@2023-04-15' = if (enableCosmos) {
  name: '${baseName}-cosmos'
  location: location
  kind: 'GlobalDocumentDB'
  properties: {
    databaseAccountOfferType: 'Standard'
    locations: [
      {
        failoverPriority: 0
        isZoneRedundant: false
        locationName: location
      }
    ]
    consistencyPolicy: {
      defaultConsistencyLevel: 'Session'
    }
  }
}

resource cosmosDb 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases@2023-04-15' = if (enableCosmos) {
  name: '${cosmos.name}/portfolio'
  properties: {}
}

resource cosmosContainer 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers@2023-04-15' = if (enableCosmos) {
  name: '${cosmos.name}/${cosmosDb.name}/messages'
  properties: {
    partitionKey: {
      paths: [ '/email' ]
      kind: 'Hash'
    }
    options: {
      throughput: cosmosThroughput
    }
  }
}

output functionAppName string = func.name
output appInsightsConnectionString string = ai.properties.ConnectionString
output cosmosEndpoint string = enableCosmos ? cosmos.properties.documentEndpoint : ''
