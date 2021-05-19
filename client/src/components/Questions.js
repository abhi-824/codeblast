import React from "react";
import "../css/Questions.css";

const Questions = () => {
  
  return (
    <div>
      <div class="questions">
        <div className="cards">
          <div className="card card1">
            <div className="container">
              <img src="../../resources/a.jpg" alt />
            </div>
            <div className="details">
              <h3>1525A</h3>
              <div className="button-do-it">Do It</div>
            </div>
          </div>
          <div className="card card2">
            <div className="container">
              <img src="../../resources/b.jpg" alt />
            </div>
            <div className="details">
              <h3>1525B</h3>
              <div className="button-do-it">Do It</div>
            </div>
          </div>
        </div>
        <div className="cards">
          <div className="card card3">
            <div className="container">
              <img src="../../resources/c.jpg" alt />
            </div>
            <div className="details">
              <h3>1525C</h3>
              <div className="button-do-it">Do It</div>
            </div>
          </div>
          <div className="card card4">
            <div className="container">
              <img src="../../resources/d.jpg" alt />
            </div>
            <div className="details">
              <h3>1525D</h3>
              <div className="button-do-it">Do It</div>
            </div>
          </div>
        </div>
      </div>
   
    </div>
  );
};

export default Questions;
