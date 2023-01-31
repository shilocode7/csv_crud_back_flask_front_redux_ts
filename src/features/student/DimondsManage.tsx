import React, { useEffect, useState } from 'react';
import './styles.css'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Dimonds } from '../../models/Dimond';
import { selectDimonds, getDimondsAsync, addDimondAsync, updDimondAsync, selectUpdate, DimondsState } from './dimondSlice';
export function DimondsManage() {
    const dimonds = useAppSelector(selectDimonds);
    const updFlag = useAppSelector(selectUpdate);

    const dispatch = useAppDispatch();
    const [carat, setcarat] = useState(0)
    const [clarity, setclarity] = useState("")
    const [color, setcolor] = useState("")
    const [cut, setcut] = useState("")
    const [depth, setdepth] = useState(0)
    const [price, setprice] = useState(0)
    const [table, settable] = useState(0)
    const [x, setx] = useState(0)
    const [y, sety] = useState(0)
    const [z, setz] = useState(0)

    const [search, setsearch] = useState("")

    const build_dimond = () => {
        console.log("test")
        const temp_dimond: Dimonds = {
            carat, clarity, color, cut, depth, price, table, x, y, z,
        }
        dispatch(addDimondAsync(temp_dimond))

    }
    const upd_grade = () => {
        console.log("test")
        const temp_dimond: Dimonds = {
            carat, clarity, color, cut, depth, price, table, x, y, z, 
        }
        dispatch(updDimondAsync(temp_dimond))

    }
    useEffect(() => {
        dispatch(getDimondsAsync())
    }, [dimonds.length])

    return (
        <div>
            <h3>To add new dimond</h3>
            carat: <input onChange={(e) => setcarat(+e.target.value)} />&nbsp;
            clarity: <input onChange={(e) => setclarity(e.target.value)} />&nbsp;
            color: <input onChange={(e) => setcolor(e.target.value)} /><br />
            cut: <input onChange={(e) => setcut(e.target.value)} />&nbsp;
            depth: <input onChange={(e) => setdepth(+e.target.value)} />&nbsp;
            price: <input onChange={(e) => setprice(+e.target.value)} />&nbsp;
            table: <input onChange={(e) => settable(+e.target.value)} />&nbsp;<br />
            x: <input onChange={(e) => setx(+e.target.value)} />&nbsp;
            y: <input onChange={(e) => sety(+e.target.value)} />&nbsp;
            z: <input onChange={(e) => setz(+e.target.value)} />&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={() => build_dimond()}>Add</button>&nbsp;
            <hr></hr>
            Search:<input placeholder="serch by cut" onChange={(e) => setsearch(e.target.value)} /><br />
            <table className="table">
  <thead className="thead-dark">
    <tr>
      <th>Carat</th>
      <th>Clarity</th>
      <th>Color</th>
      <th>Cut</th>
      <th>Depth</th>
      <th>Price</th>
      <th>Table</th>
      <th>X</th>
      <th>Y</th>
      <th>Z</th>
    </tr>
  </thead>
  <tbody >
    {dimonds.filter(dim => dim.cut.includes(search)).map((dim, i) => 

<tr key={i}>
        <td>{dim.carat}</td>
        <td>{dim.clarity}</td>
        <td>{dim.color}</td>
        <td>{dim.cut}</td>
        <td>{dim.depth}</td>
        <td>{dim.price}</td>
        <td>{dim.table}</td>
        <td>{dim.x}</td>
        <td>{dim.y}</td>
        <td>{dim.z}</td>
      </tr>
    )}
  </tbody>
</table>
        </div>
    );
}
