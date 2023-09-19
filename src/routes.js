

import ManagerSupplier from "views/screen/ManagerSupplier";
import ManagerCategory from "views/screen/ManagerCategory";
import ManagerProduct from "views/screen/ManagerProduct";

var routes = [

 

  {
    path: "/manager-category",
    name: "Manager Category",
    icon: "ni ni-circle-08 text-pink",
    component: <ManagerCategory />,
    layout: "/admin",
    hidden: false,
    permison: "0",
  },
 
  {
    path: "/manager-supplier",
    name: "Manager Supplier",
    icon: "ni ni-circle-08 text-pink",
    component: <ManagerSupplier />,
    layout: "/admin",
    hidden: false,
    permison: "0",
  },
  {
    path: "/manager-product",
    name: "ManagerProduct",
    icon: "ni ni-laptop text-info",
    component: <ManagerProduct />,
    layout: "/admin",
    hidden: false,
    permison: "0",
  },
  
];
export default routes;
