import React, { useState } from "react";
import data from "../../data";
import "./style.css";

const Accordion = () => {
  const [selected, setSelected] = useState(null);
  const [enablemultiselection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  const handleSingleSelection = (id) => {
    setSelected((id === selected ? null : id));
  };

  const handleMultiSelection = (id) => {
    let copymultiple = [...multiple];
    const findIndexOfCurrentId = copymultiple.indexOf(id);
    if (findIndexOfCurrentId === -1) copymultiple.push(id);
    else copymultiple.splice(findIndexOfCurrentId, 1);
    setMultiple(copymultiple);
  };

  return (
    <>
      <h1 className="project-title">Accordion</h1>
      <div className="wrapper">
        <button onClick={() => setEnableMultiSelection(!enablemultiselection)}>
          Enable Multi Selection
        </button>
        <div className="accordion">
          {data && data.length > 0 ? (
            data.map((dataitem) => (
              <div key={dataitem.id} className="item">
                <div
                  onClick={
                    enablemultiselection
                      ? () => handleMultiSelection(dataitem.id)
                      : () => handleSingleSelection(dataitem.id)} className="title">
                  <h2>{dataitem.question}</h2>
                  <span>+</span>
                </div>

                {enablemultiselection
                  ? multiple.indexOf(dataitem.id) !== -1 && (
                      <div className="content">
                        <span>{dataitem.answer}</span>
                      </div>
                    )
                  : selected === dataitem.id && (
                      <div className="content">
                        <span>{dataitem.answer}</span>
                      </div>
                    )
                }

                {/* {selected === dataitem.id || multiple.indexOf(dataitem.id) !== -1 ? (
                  <div className="content">
                    <span>{dataitem.answer}</span>
                  </div>
                ) : null} */}
              </div>
            ))
          ) : (
            <small>No Data Found</small>
          )}
        </div>
      </div>
    </>
  );
};

export default Accordion;
