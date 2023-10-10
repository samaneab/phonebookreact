import React from "react";

import axios from "axios";

class Allcontacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      isLoading: true,
    };
  }

  componentDidMount() {
    axios
      .request({
        method: "get",
        url: "http://127.0.0.1:5000/getall",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        this.setState({ data: response.data });
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { isLoading, data } = this.state;

    if (isLoading) {
      return <h1>loading</h1>;
    }

    return (
      <>
        <div className="container">
          <div className="justify-content-center h-100 w-75 p-3">
            <h2>لیست مخاطبان</h2>
            <table className="table table-bordered table-light">
              <thead>
                <tr>
                  <th scope="col-1">ردیف</th>
                  <th scope="col-1">نام</th>
                  <th scope="col-1">نام خانوادگی</th>
                  <th scope="col-1">شماره پرسنلی</th>
                  <th scope="col-1">تلفن مستقیم</th>
                  <th scope="col">داخلی</th>
                  <th scope="col">فکس</th>
                  <th scope="col">واحد</th>
                  <th scope="col">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.familyName}</td>
                    <td>{item.personalId}</td>
                    <td>{item.straightLine}</td>
                    <td>{item.internal}</td>
                    <td>{item.faxNumber}</td>
                    <td>{item.unit}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          axios
                            .request({
                              method: "post",
                              url: `http://127.0.0.1:5000/deleteuser?id=${item.id}`,
                              headers: {
                                "Access-Control-Allow-Origin": "*",
                              },
                            })
                            .then((response) => {
                              console.log(response);
                            });

                          this.setState({
                            data: data.filter(
                              (x) => data.indexOf(x) !== data.indexOf(item)
                            ),
                          });
                        }}
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default (props) => <Allcontacts {...props} />;
