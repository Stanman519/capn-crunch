import React from 'react';
import TriTable from '../components/TriTable.js';
import DeadCapTable from '../components/DeadCapTable.js';
import CapDetails from '../components/CapDetails.js';
import '../styles/Home.css';

class Home extends React.Component {
    render(){
        return (
        <div class="background">
          <div class="App">
            <div class="left-side">
              <DeadCapTable class="dead-cap-table"/>
              <TriTable class="tri-table" />
            </div>
              <div class="right-side">
                <CapDetails class="cap-details"/> 
              </div>
          </div>
        </div>
      );
    }
}
export default Home;