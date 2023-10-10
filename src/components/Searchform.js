import React from "react";
import axios from "axios";
import "./searchform.css";

class Searchform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      name: undefined,
      famname: undefined,
      pid: undefined,
      unitselect: undefined,
      isLoading: false,
      qstate: 0,

      suggfname: [],
      sugglname: [],
      units: [],
    };
  }
  componentDidMount() {
    axios
      .request({
        method: "get",
        url: "http://127.0.0.1:5000/getunits",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        this.setState({ units: response.data });
      });
  }
  render() {
    const { data, qstate, isLoading } = this.state;

    const filterUrlHandler = () => {
      let urlString = "";
      if (this.state.name !== undefined) {
        if (urlString.length > 0) {
          urlString += `&name=${this.state.name}`;
        } else {
          urlString += `name=${this.state.name}`;
        }
      }
      if (this.state.famname !== undefined) {
        if (urlString.length > 0) {
          urlString += `&fname=${this.state.famname}`;
        } else {
          urlString += `fname=${this.state.famname}`;
        }
      }
      if (this.state.unitselect !== undefined) {
        if (urlString.length > 0) {
          urlString += `&unit=${this.state.unitselect}`;
        } else {
          urlString += `unit=${this.state.unitselect}`;
        }
      }
      if (this.state.pid !== undefined) {
        if (urlString.length > 0) {
          urlString += `&numid=${this.state.pid}`;
        } else {
          urlString += `numid=${this.state.pid}`;
        }
      }
      console.log(urlString);
      this.state.filterUrl = urlString;
    };

    const suggHandler = (key, ktype) => {
      if (key && ktype) {
        axios
          .request({
            method: "get",
            url: `http://127.0.0.1:5000/suggestion?key=${key}&ktype=${ktype}`,
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          })
          .then((response) => {
            console.log(response.data);
            if (ktype === "f") {
              this.setState({ suggfname: response.data });
            }
            if (ktype === "l") {
              this.setState({ sugglname: response.data });
            }
          })
          .catch((e) => console.log(e));
      }
    };

    const search = () => {
      this.setState({ isLoading: true });
      filterUrlHandler();
      if (this.state.filterUrl === "") {
        this.setState({ qstate: 3 });
        this.setState({ isLoading: false });
      } else {
        axios
          .request({
            method: "get",
            url: `http://127.0.0.1:5000/searchContacts?${this.state.filterUrl}`,
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          })
          .then((response) => {
            console.log(response.data);
            if (response.data.length > 0) {
              this.setState({ data: response.data });
              this.setState({ qstate: 1 });
              this.setState({ isLoading: false });
            } else {
              this.setState({ qstate: 2 });
              this.setState({ isLoading: false });
            }
          });
      }
    };

    if (isLoading) {
      return <h1>loading</h1>;
    }

    return (
      <>
        <div>
          <div>
            {this.state.suggfname.length > 0 ? (
              <div className="sugg-div sugg-fname">
                {this.state.suggfname.map((item) => (
                  <div
                    onClick={() => {
                      this.setState({ name: item });
                      suggHandler(this.state.name, "f");
                    }}
                  >
                    <span>{item}</span>
                    <br />
                  </div>
                ))}
              </div>
            ) : (
              <span></span>
            )}
          </div>

          <div>
            {this.state.sugglname.length > 0 ? (
              <div className="sugg-div sugg-lname">
                {this.state.sugglname.map((item) => (
                  <div
                    onClick={() => {
                      this.setState({ famname: item });
                      suggHandler(this.state.famname, "l");
                    }}
                  >
                    <span>{item}</span>
                    <br />
                  </div>
                ))}
              </div>
            ) : (
              <span></span>
            )}
          </div>
          <div className="d-flex justify-content-center h-100 mt-4">
            <div className="card ">
              <div className="card-header bg-primary">
                <h3 className="titr">جستجوی مخاطب</h3>
              </div>
              <div className="card-body bg-light">
                <form>
                  <div className="input-group form-group">
                    <input
                      type="text"
                      className="form-control myinputs"
                      placeholder="نام موردنظر را وارد کنید"
                      value={this.state.name}
                      onChange={(n) => {
                        this.setState({ name: n.target.value });
                        if (n.target.value === "") {
                          this.setState({ suggfname: [] });
                        }
                        suggHandler(n.target.value, "f");
                      }}
                    />
                  </div>
                  <div className="input-group form-group">
                    <input
                      type="text"
                      className="form-control myinputs"
                      placeholder="نام خانوادگی موردنظر را وارد کنید"
                      value={this.state.famname}
                      onChange={(fa) => {
                        this.setState({ famname: fa.target.value });
                        if (fa.target.value === "") {
                          this.setState({ sugglname: [] });
                        }
                        suggHandler(fa.target.value, "l");
                      }}
                    />
                  </div>
                  <div className="input-group form-group">
                    <input
                      type="text"
                      className="form-control myinputs"
                      placeholder="شماره پرسنلی موردنظر را وارد کنید"
                      value={this.state.pid}
                      onChange={(p) => this.setState({ pid: p.target.value })}
                    />
                  </div>

                  <div className="btnunit mt-2 form-group btn-group">
                    <span className="btn btn-secondary btn-sm" type="button">
                      {this.state.unitselect !== undefined
                        ? this.state.unitselect
                        : "واحد کاری"}
                    </span>
                    <button
                      type="button"
                      class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="visually-hidden">
                        {this.state.unitselect
                          ? this.state.unitselect !== undefined
                          : "انتخاب کنید"}
                      </span>
                    </button>
                    <ul className="dropdown-menu">
                      {this.state.units.map((item) => (
                        <li
                          key={item}
                          onClick={() => {
                            this.setState({ unitselect: item });
                            console.log(this.state.unitselect);
                          }}
                        >
                          <a class="dropdown-item">{item}</a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="form-group">
                    <button
                      className="btn btn-primary login_btn"
                      style={{ marginRight: "120px", marginTop: "30px" }}
                      onClick={search}
                    >
                      جستجو
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="justify-content-center h-100 mt-4">
          {qstate == 2 ? (
            <div>
              <h3> یافت نشد</h3>
            </div>
          ) : qstate == 1 ? (
            <div>
              <table className="table table-bordered table-light mt-5">
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : qstate == 3 ? (
            <div className="text-danger">حتما باید فیلتری انتخاب کنید</div>
          ) : (
            <div></div>
          )}
        </div>
      </>
    );
  }
}

export default (props) => <Searchform {...props} />;
