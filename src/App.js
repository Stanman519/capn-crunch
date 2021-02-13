import React from 'react';

import TriTable from './components/TriTable.js';
import ImpendingFreeAgents from './components/ImpendingFreeAgents.js';
import DeadCapTable from './components/DeadCapTable.js';
import CapDetails from './components/CapDetails.js';
import './App.css';


export default function App() {
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
