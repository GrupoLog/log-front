import Spinner from "@/components/ui/spinner";
import dynamic from "next/dynamic";

export function loadChart(path: string) {
  return dynamic(() => import(`@/components/charts/${path}`), {
    ssr: false,
    loading: () => <Spinner />,
  });
}