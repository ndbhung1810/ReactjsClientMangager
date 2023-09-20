
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
} from "reactstrap";

import UserHeader from "components/Headers/UserHeader.js";
import { useEffect, useState } from "react";
import axios from "axios";

const DEFAUL_OBJECT = {
  id:-1,
  NameCategory: "",
};

const ManagerCategory = () => {
  const [object, setObject] = useState(DEFAUL_OBJECT);
  const [list, setList] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateList, setUpdateList] = useState();
  

  const handleChangeData = (e) => {
    const { name } = e.currentTarget;
    const value = e.currentTarget.value;
    setObject({
      ...object,
      [name]: value,
    });
  };

  const handleAddCaregory = (e) => {
    setObject(DEFAUL_OBJECT);
    setIsUpdate(false);
  };

  const handleSubmit = async () => {

    if (isUpdate) {
      axios
        .put("https://nodeserverapp-2drp.onrender.com/api/categories/"+object.IDCategory, object)
        .then((response) => {
          if (response.data.status) {
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
      axios
        .post("https://nodeserverapp-2drp.onrender.com/api/categories", object)
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
      .get("https://nodeserverapp-2drp.onrender.com/api/categories", )
      .then((response) => {
        const listnew = response.data.data;
          setList(listnew);
      })
      .catch(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateList]);

  const deleteObject = (IDCategory) => {
    axios
      .delete("https://nodeserverapp-2drp.onrender.com/api/categories/" + IDCategory)
      .then((response) => {
       
        if (response.data.status) {
          alert(response.data.message);
          setUpdateList(!updateList);
        } else {
          alert(response.data.message);
        }
      })
      .catch(console.log);
  };

  const updateObject = (data) => {
    window.scrollTo(0, 0)
    setIsUpdate(true);
    setObject(data);
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
                    Thông tin danh mục
                  </h6>

                  <div className="pl-lg-4">
                    <Row>
                      <Button
                        type="button"
                        onClick={handleAddCaregory}
                        color="success"
                        outline
                      >
                        {" "}
                        Thêm danh mục
                      </Button>
                    </Row>
                    <Row>
                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Tên danh mục
                          </label>
                          <Input
                            name="NameCategory"
                            className="form-control-alternative"
                            value={object.NameCategory}
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
                            {!isUpdate ? "Bổ sung" : "Cập nhật"}
                          </Button>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Danh sách
                  </h6>
                  <div className="col">
                  <Card className="shadow">
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">id</th>
                            <th style={{'font-weight': '700','color':'#000000'}} scope="col">name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {list.map((data) => (
                            <tr key={data.IDCategory}>
                              <td>{data.IDCategory}</td>
                              <td style={{'font-weight': '700','color':'#000000'}}>{data.NameCategory}</td>

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
                                          onClick={() => deleteObject(data.IDCategory)}
                                        >
                                          Xóa danh mục
                                        </DropdownItem>
                                        <DropdownItem
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

export default ManagerCategory;
