import { Loader } from "@/components/loader";

export default function Loading() {
  return (
    <div className="grid min-h-[50vh] place-items-center py-24">
      <Loader />
    </div>
  );
}
