import 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import * as d3 from 'd3';
import './App.scss';

function App() {
  const [budgetData, setBudgetData] = useState({ myBudget: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/budget');
        console.log(response);
        setBudgetData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Once the budgetData is available, create the pie charts
    if (budgetData.myBudget.length > 0) {
      createD3(budgetData.myBudget);
    }
  }, [budgetData]);

  const chartData = {
    labels: budgetData.myBudget.map((item) => item.title),
    datasets: [
      {
        data: budgetData.myBudget.map((item) => item.budget),
        backgroundColor: ['red', 'blue', 'green'], // Add more colors if needed
      },
    ],
  };

  const createD3 = (data) => {
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;
    const svg = d3
      .select('#d3Chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const color = d3
      .scaleOrdinal()
      .domain(data.map((item) => item.title))
      .range(['red', 'blue', 'green']);

    const pie = d3.pie().value((d) => d.budget);

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const pieGroup = svg
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arcs = pieGroup
      .selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => color(d.data.title));

    const legend = svg
      .selectAll('.legend')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(0, ${i * 20})`);

    legend
      .append('rect')
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', (d) => color(d.title));

    legend
      .append('text')
      .attr('x', 30)
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'start')
      .text((d) => d.title);
  };

  return (
    <div className='App'>
      <a href='#main' className='skip'>
        Skip to content
      </a>

      <nav>
        <ul>
          <li>
            <a href='/'>Home</a>
          </li>
          <li>
            <a href='/about.html'>About</a>
          </li>
          <li>
            <a href='/login.html'>Login</a>
          </li>
          <li>
            <a href='https://google.com'>Google</a>
          </li>
        </ul>
      </nav>

      <div className='hero'>
        <h1>Personal Budget</h1>
        <h2>A personal-budget management app</h2>
      </div>

      <main className='center' id='main'>
        <div className='page-area'>
          <article>
            <h1>Stay on track</h1>
            <p>
              Do you know where you are spending your money? If you really stop
              to track it down, you would get surprised! Proper budget
              management depends on real data... and this app will help you with
              that!
            </p>
          </article>

          <article>
            <h1>Alerts</h1>
            <p>
              What if your clothing budget ended? You will get an alert. The
              goal is to never go over the budget.
            </p>
          </article>

          <article>
            <h1>Results</h1>
            <p>
              People who stick to a financial plan, budgeting every expense, get
              out of debt faster! Also, they to live happier lives... since they
              expend without guilt or fear... because they know it is all good
              and accounted for.
            </p>
          </article>

          <article>
            <h1>Free</h1>
            <p>
              This app is free!!! And you are the only one holding your data!
            </p>
          </article>

          <article>
            <h1>Stay on track</h1>
            <p>
              Do you know where you are spending your money? If you really stop
              to track it down, you would get surprised! Proper budget
              management depends on real data... and this app will help you with
              that!
            </p>
          </article>

          <article>
            <h1>Alerts</h1>
            <p>
              What if your clothing budget ended? You will get an alert. The
              goal is to never go over the budget.
            </p>
          </article>

          <article>
            <h1>Results</h1>
            <p>
              People who stick to a financial plan, budgeting every expense, get
              out of debt faster! Also, they to live happier lives... since they
              expend without guilt or fear... because they know it is all good
              and accounted for.
            </p>
          </article>

          <article>
            <h1>Charts</h1>
            <Pie data={chartData} width={400} height={400} />
            <svg id='d3Chart' width={400} height={400}></svg>
          </article>
        </div>
      </main>

      <footer className='bottom'>
        <div className='center'>All rights reserved &copy; Fabio Nolasco</div>
      </footer>
    </div>
  );
}

export default App;
