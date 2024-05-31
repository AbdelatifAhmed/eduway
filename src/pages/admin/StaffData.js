import React from 'react'
import { FaSort } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function StaffData(props) {
  return (
    <div>
      <header>
              <Link
                to={ `/admin/${props.link}`}
                className="btn btn-info btn-lg"
                style={{ color: "white" }}
              >
                + Add New 
              </Link>
            </header>
         <div className="table-content">
            <table className="table table-striped mt-2">
              <thead>
                <tr>
                  <th
                    scope="col"
                    style={{ background: "#121431", color: "white" }}
                  >
                    <div className="th-flex">
                      <span className="th-name">Name in Arabic</span>
                      <span>
                        <FaSort />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    style={{ background: "#121431", color: "white" }}
                  >
                    <div className="th-flex">
                      <span className="th-name">Name in English</span>
                      <span>
                        <FaSort />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    style={{ background: "#121431", color: "white" }}
                  >
                    <div className="th-flex">
                      <span className="th-name">Mail</span>
                      <span>
                        <FaSort />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    style={{ background: "#121431", color: "white" }}
                  >
                    <div className="th-flex">
                      <span className="th-name">Gender</span>
                      <span>
                        <FaSort />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    style={{ background: "#121431", color: "white" }}
                  >
                    <div className="th-flex">
                      <span className="th-name">Nationality</span>
                      <span>
                        <FaSort />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    style={{ background: "#121431", color: "white" }}
                  >
                    <div className="th-flex">
                      <span className="th-name">Religion</span>
                      <span>
                        <FaSort />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    style={{ background: "#121431", color: "white" }}
                  >
                    <div className="th-flex">
                      <span className="th-name">Operation</span>
                      <span>
                        <FaSort />
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>{props.show}</tbody>
            </table>
          </div>
    </div>
  )
}
