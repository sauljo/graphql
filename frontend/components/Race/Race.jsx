import React, { useLayoutEffect, useState, Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import "./race.scss";


const Race = () => {
  const [ page, setPage ] = useState(1);
  const [ count, setCount ] = useState(50);
  const [ unlimited, setUnlimited ] = useState(false);
  
  const USERS = gql`
    {
      users(page: ${page}, count: ${count}, unlimited: ${unlimited}) {
        name,
        speed,
        time,
        color
      }
    }
  `;

  const { loading, error, data } = useQuery(USERS);

  function paginationPrev() {
    page > 1 ? setPage(page - 1) : null;
  }

  function paginationNext() {
    setPage(page + 1);
  }

  return ( 
    <Fragment>
      <div className="race">
        {loading ? 
          <div className="race__loading"><h4>loading...</h4></div> :
          (
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Color</th>
                  <th>Speed</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {data.users.map((item, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{item.name}</td>
                    <td>{item.color}</td>
                    <td>{item.speed}</td>
                    <td>{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        }
      </div>
      <div className={"race_pagination"}>
        <button onClick={paginationPrev}>Prev</button>
        <button onClick={paginationNext}>Next</button>
      </div>
    </Fragment>
  )
}

export default Race;