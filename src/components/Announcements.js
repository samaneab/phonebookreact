import React from "react";

import axios from "axios";

class Announcements extends React.Component {
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
        url: "http://127.0.0.1:5000/getallblogs",
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
            <h2>اطلاعیه ها</h2>
            <table className="table table-bordered table-light">
              <thead>
                <tr>
                  <th scope="col-1">شناسه</th>
                  <th scope="col-1">تیتر</th>
                  <th scope="col-1">متن</th>
                  <th scope="col">زمان تشکیل</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.txt}</td>
                    <td>{item.created}</td>
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

export default (props) => <Announcements {...props} />;
