# Azure Bicep (Infrastructure as Code)

This template provisions:
- Storage Account (for Functions)
- Application Insights
- Consumption Plan + Linux Function App (Node 18)
- Optional Cosmos DB (Core SQL), database `portfolio`, container `messages`

## Deploy

```powershell
# Log in and set subscription
az login
az account set --subscription "Azure for Students"

# Create resource group
az group create -n rg-mandar-portfolio -l "Central India"

# Deploy
az deployment group create \
  -g rg-mandar-portfolio \
  -f azure/bicep/main.bicep \
  -p baseName=mandar-portfolio enableCosmos=true
```

Outputs:
- functionAppName
- appInsightsConnectionString
- cosmosEndpoint (if enabled)

Apply outputs to your app settings and `.env.local` as needed.
