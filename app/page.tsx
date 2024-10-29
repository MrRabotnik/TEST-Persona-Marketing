import ProductsTable from "./components/ProductsTable";
import DATA from "./utils/mockData";

export default function Home() {
    return <ProductsTable data={DATA} />;
}
