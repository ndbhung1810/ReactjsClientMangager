
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Row,
  Table,
  Col,
  Dropdown,
  ButtonDropdown,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { useEffect, useState } from "react";
import axios from "axios";

const ManagerProduct = () => {

  const DEFAUL_OBJECT = {
    IDProduct : -1,
    NameProduct: "",
    IDCategory: -1,
    IDSupplier: -1,
    NameCategory: "",
    NameSupplier:"",
    Descriptions:"",
    Image : ""
  };
  const [object, setObject] = useState(DEFAUL_OBJECT);
  const [list, setList] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [listCategory, setListCategory] = useState([]);
  const [listSupplier, setListSupplier] = useState([]);
  const [updateList, setUpdateList] = useState();
  const [search, setSearch] = useState("");


  const [dropdownOpenC, setDropdownOpenC] = useState(false);
  const [dropdownOpenCS, setDropdownOpenCS] = useState(false);

  const toggleC = () => setDropdownOpenC((prevState) => !prevState);
  const toggleCS = () => setDropdownOpenCS((prevState) => !prevState);



  useEffect(() => {
    axios
      .get("https://nodeserverapp-2drp.onrender.com/api/categories")
      .then((response) => {
        const listnew = response.data.data;
        setListCategory(listnew);
      })
      .catch(console.log);


      axios
      .get("https://nodeserverapp-2drp.onrender.com/api/supplies")
      .then((response) => {
        const listnew = response.data.data;
        setListSupplier(listnew);
      })
      .catch(console.log);
  }, []);

 

  const handleChangeData = (e) => {
    const { name } = e.currentTarget;
    const value = e.currentTarget.value;
    setObject({
      ...object,
      [name]: value,
    });
  };


  const handleChangeDataSearch = (e) => {
    const value = e.currentTarget.value;
    setSearch(value);
  };

 

 

  const handleSubmit = () => {
  
    if (isUpdate) {
      if(object.IDProduct === -1 || object.NameProduct === "" || object.IDCategory === -1 || object.IDSupplier === -1) {
        alert("Vui lòng không được bỏ trống thông tin");
        return
      }
      axios
        .put("https://nodeserverapp-2drp.onrender.com/api/products/"+object.IDProduct, object)
        .then((response) => {
         
          if (response.data.status ) {
            alert(response.data.message);
            setIsUpdate(false);
            setUpdateList(!updateList);
            setObject(DEFAUL_OBJECT);
          } else {
            alert(response.data.message);
            return;
          }
        })
        .catch(console.log);
    } else {
      if( object.NameProduct === "" || object.IDCategory === -1 || object.IDSupplier === -1) {
        alert("Vui lòng không được bỏ trống thông tin");
        return
      }
      axios
        .post("https://nodeserverapp-2drp.onrender.com/api/products",object)
        .then((response) => {
          
          if (response.data.status) {
            alert(response.data.message);
            setUpdateList(!updateList);
            setObject(DEFAUL_OBJECT);
          } else {
            alert(response.data.message);
            return;
          }
        })
        .catch(console.log);
    }
  };

  useEffect(() => {
    axios
      .get(
        "https://nodeserverapp-2drp.onrender.com/api/products?search="+search
      )
      .then((response) => {
       
        const listnew = response.data.data;
          setList(listnew);
      })
      .catch(console.log);
  }, [updateList,search]);

  const handleChangeDrop = (code,name) => {
    setObject({ ...object, IDCategory:code,NameCategory:name });
  };

  const handleChangeDropSupplier = (code,name) => {
    setObject({ ...object, IDSupplier:code,NameSupplier:name });
  };

  const deleteObject = (data) => {
    axios
      .delete("https://nodeserverapp-2drp.onrender.com/api/products/" + data.IDProduct)
      .then((response) => {
       
        if (response.data.status ) {
          alert(response.data.message);
          setUpdateList(!updateList);
        } else {
          alert(response.data.message);
        }
      })
      .catch(console.log);
  };

  const updateObject = (data) => {
    console.log(data)
    window.scrollTo(0, 0)
    setIsUpdate(true);
    setObject(data);
  };

  const handleAddProduct = (e) => {
    setObject(DEFAUL_OBJECT);
    setIsUpdate(false);
  };

  




  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Thông tin sản phẩm
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Button
                        type="button"
                        onClick={handleAddProduct}
                        color="success"
                        outline
                      >
                        {" "}
                        Thêm sản phẩm
                      </Button>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <Row>
                          <Col lg="8">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-codeDevice"
                              >
                                Tên sản phẩm
                              </label>
                              <Input
                                name="NameProduct"
                                className="form-control-alternative"
                                value={object.NameProduct}
                                onChange={handleChangeData}
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-workpart"
                              >
                                Nhà cung cấp
                              </label>
                              <FormGroup>
                                <ButtonDropdown className="form-control-alternative">
                                  <Dropdown
                                    isOpen={dropdownOpenC}
                                    toggle={toggleC}
                                  >
                                    <DropdownToggle
                                      caret
                                      className="dropdown-toggle"
                                    >
                                      {object.NameSupplier === ""
                                        ? "Chọn nhà cung cấp"
                                        : object.NameSupplier}
                                    </DropdownToggle>
                                    <DropdownMenu className="currency-dropdown">
                                      {listSupplier.map((data) => (
                                        <DropdownItem
                                          value={data.NameSupplier}
                                          onClick={() =>
                                            handleChangeDropSupplier(data.IDSupplier, data.NameSupplier)
                                          }
                                        >
                                          {data.NameSupplier}
                                        </DropdownItem>
                                      ))}
                                    </DropdownMenu>
                                  </Dropdown>
                                </ButtonDropdown>
                              </FormGroup>
                            </FormGroup>
                          </Col>
                          
                         
                        </Row>

                        <Row>
                          
                          <Col lg="8">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-workpart"
                              >
                                Image URL
                              </label>
                              <Input
                                name="Image"
                                className="form-control-alternative"
                                value={object.Image}
                                onChange={handleChangeData}
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-workpart"
                              >
                                Danh mục
                              </label>
                              <FormGroup>
                                <ButtonDropdown className="form-control-alternative">
                                  <Dropdown
                                    isOpen={dropdownOpenCS}
                                    toggle={toggleCS}
                                  >
                                    <DropdownToggle
                                      caret
                                      className="dropdown-toggle"
                                    >
                                      {object.NameCategory === ""
                                        ? "Chọn danh mục"
                                        : object.NameCategory}
                                    </DropdownToggle>
                                    <DropdownMenu className="currency-dropdown">
                                      {listCategory.map((data) => (
                                        <DropdownItem
                                          value={data.NameCategory}
                                          onClick={() =>
                                            handleChangeDrop(data.IDCategory, data.NameCategory)
                                          }
                                        >
                                          {data.NameCategory}
                                        </DropdownItem>
                                      ))}
                                    </DropdownMenu>
                                  </Dropdown>
                                </ButtonDropdown>
                              </FormGroup>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                      <Col lg="6">
                      <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-workpart"
                              >
                                Mô tả
                              </label>
                              <Input
                                name="Descriptions"
                                className="form-control-alternative"
                                value={object.Descriptions}
                                onChange={handleChangeData}
                                type="text"
                              />
                            </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="2">
                        <FormGroup>
                          <Button
                            type="button"
                            onClick={handleSubmit}
                            color="primary"
                          >
                            {" "}
                            {isUpdate ? "Cập nhật" : "Create New"}
                          </Button>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted">
                    Danh sách thiết bị
                  </h6>
                  <FormGroup>
                  <Input
                                name="search"
                                className="form-control-alternative"
                                value={search}
                                onChange={handleChangeDataSearch}
                                type="text"
                                placeholder="Tìm kiếm theo tên....."
                              />
                  </FormGroup>
                  <div className="col">
                    <Card className="shadow">
                      <Table className="align-items-center" responsive>
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">IDProduct</th>
                            <th scope="col">Image</th>
                            <th scope="col">NameProduct</th>
                            <th scope="col">Supplier</th>
                            <th scope="col">Category</th>
                            <th scope="col">Description</th>
                            <th scope="col" />
                          </tr>
                        </thead>
                        <tbody>
                          {list.map((data) => (
                            <tr key={data.IDProduct}>
                              <td>
                                {data.IDProduct}
                              </td>
                              <td>
                                <img
                                  src={data.Image}
                                  style={{ "max-width": "120px" }}
                                  alt="..."
                                />
                              </td>
                              <td >
                                {data.NameProduct}
                              </td>
                              
                              <td >
                                {data.NameSupplier}
                              </td>
                              <td >
                                {data.NameCategory}
                              </td>
                              <td  style={{"width":"200px"}}>
                                {data.Descriptions}
                              </td>
                             
                          
                              <td className="text-right">
                                <UncontrolledDropdown>
                                  <DropdownToggle
                                    className="btn-icon-only text-light"
                                    href="#pablo"
                                    role="button"
                                    size="sm"
                                    color=""
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    <i className="fas fa-ellipsis-v" />
                                  </DropdownToggle>
                                  <DropdownMenu
                                    className="dropdown-menu-arrow"
                                    right
                                  >
                                 
                                    <DropdownItem
                                      href="#pablo"
                                      onClick={() => deleteObject(data)}
                                    >
                                      Xóa sản phẩm
                                    </DropdownItem>
                                    <DropdownItem
                                      href="#pablo"
                                      onClick={() => updateObject(data)}
                                    >
                                      Chỉnh sửa
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                 
                    </Card>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ManagerProduct;
