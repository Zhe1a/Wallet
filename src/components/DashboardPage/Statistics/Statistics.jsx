import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Select from 'react-select';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionsSummary } from 'redux/statistics/statisticsOperations';
import {
  categoriesSummary,
  expenseSummary,
  incomeSummary,
} from 'redux/statistics/statisticsSelectors';
import s from './Statistics.module.css';
import { getAuthBalance } from 'redux/AuthRedux/selectors';


ChartJS.register(ArcElement, Tooltip, Legend);

const Statistics = () => {
  const stateStatistics = useSelector(categoriesSummary);
  const expense = useSelector(expenseSummary);
  const income = useSelector(incomeSummary);
  const balance = useSelector(getAuthBalance);

  const [selectedMounth, setSelectedMounth] = useState(null);
  const [selectedYear, setSelectedYear] = useState({
    value: '2022',
    label: '2022',
  });

  const dispatch = useDispatch();
  const isData = stateStatistics.length;
  let dataStatistics = [];

  useEffect(() => {
    const timeSelected = {
      month: selectedMounth ? selectedMounth.value : 0,
      year: selectedYear.value,
    };

    dispatch(getTransactionsSummary(timeSelected));
  }, [selectedMounth, selectedYear, dispatch]);

  const optionsMounth = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
    { value: '', label: 'All' },
  ];
  const optionsYear = [
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' },
    { value: '2019', label: '2019' },
    { value: '2018', label: '2018' },
  ];

  const data = {
    labels: [],
    datasets: [
      {
        // label: '# of Votes',
        data: isData ? dataStatistics : [1],
        backgroundColor: [
          'rgba(254, 208, 87, 1)',
          'rgba(255, 216, 208, 1)',
          'rgba(253, 148, 152, 1)',
          'rgba(197, 186, 255, 1)',
          'rgba(110, 120, 232, 1)',
          'rgba(74, 86, 226, 1)',
          'rgba(129, 225, 255, 1)',
          'rgba(36, 204, 167, 1)',
          'rgba(0, 173, 132, 1)',
        ],
        borderColor: [],
        borderWidth: 0,
      },
    ],
  };

  const TableData = () => {
    return isData ? (
      <table className={s.table}>
        <thead className={s.tableHeader}>
          <tr>
            <th className={s.tableHeaderData}>Category</th>
            <th className={s.tableHeaderData}>Sum</th>
          </tr>
        </thead>
        <tbody>
          {stateStatistics
            .filter(({ type }) => type !== 'INCOME')
            .map(({ name, total }, idx) => {
              dataStatistics.push(Math.abs(total));
              return (
                <tr key={name}>
                  <td
                    className={`${s.tableData} ${
                      idx === 0 && s.firstTableData
                    }`}
                  >
                    <span
                      className={`${s.spanTd} ${idx === 0 && s.colorSpan1} ${
                        idx === 1 && s.colorSpan2
                      } ${idx === 2 && s.colorSpan3} ${
                        idx === 3 && s.colorSpan4
                      } ${idx === 4 && s.colorSpan5} ${
                        idx === 5 && s.colorSpan6
                      } ${idx === 6 && s.colorSpan7} ${
                        idx === 7 && s.colorSpan8
                      } ${idx === 8 && s.colorSpan9}`}
                    ></span>
                    {name}
                  </td>
                  <td
                    className={`${s.tableData} ${
                      idx === 0 && s.firstTableData
                    }`}
                  >
                    {Math.abs(total)}
                  </td>
                </tr>
              );
            })}
        </tbody>
        <tfoot>
          <tr>
            <td className={`${s.tableData} ${s.tableDataTotal}`}>Expenses:</td>
            <td className={`${s.tableData} ${s.tableDataExpenses}`}>
              {Math.abs(expense)}
            </td>
          </tr>
          <tr>
            <td className={`${s.tableData} ${s.tableDataTotal}`}>Income:</td>
            <td className={`${s.tableData} ${s.tableDataIncome}`}>
              {Math.abs(income)}
            </td>
          </tr>
        </tfoot>
      </table>
    ) : (
      <h2>Sorry, no data found, please select an alternative query</h2>
    );
  };

  return (
    <>
      <h1 className={s.statisticsHeading}>Statistics</h1>
      <div className={s.statisticsBox}>
        <div className={s.canvasBox}>
          <h2 className={s.canvasSumm}>₴{`${isData ? balance : ''}`}</h2>
          <Doughnut data={data} />
        </div>
        <div>
          <div className={s.selectBox}>
            <Select
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: 'transparent',
                  border: '1px solid #000000',
                  borderRadius: '30px',
                  height: '50px',
                  outline: 'none !important',
                  lineHeight: 1.58,
                }),
              }}
              className={s.select}
              onChange={setSelectedMounth}
              options={optionsMounth}
              placeholder="Month"
            />
            <Select
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: 'transparent',
                  border: '1px solid #000000',
                  borderRadius: '30px',
                  height: '50px',
                  outline: 'none !important',
                  lineHeight: 1.58,
                }),
              }}
              className={s.select}
              onChange={setSelectedYear}
              options={optionsYear}
              placeholder="Year"
            />
          </div>
          <TableData />
        </div>
      </div>
    </>
  );
};

export default Statistics;
