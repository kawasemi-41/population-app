import { useEffect, useState } from "react";
import { getPopulationData } from "./api/estatApi.js";
import { convertPopulationData } from "./utils/populationConverter.js";
import { parseCsv } from "./utils/csvParser.js";
import { findBestGrouping } from "./utils/groupingSolver.js";
import PopulationTable from "./components/PopulationTable.jsx";
import GroupingResult from "./components/GroupingResult.jsx";

const ROWS_PER_PAGE = 10
const CSV_FILE_PATH = "/csv/sample.csv"

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [years, setYears] = useState([]);
  const [tableData, setTableData] = useState({});

  const [groupResult, setGroupResult] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function load() {
      try {
        const json = await getPopulationData();

        const result =
          convertPopulationData(json);

        setYears(result.years);
        setTableData(result.tableData);
        
        const response =
          await fetch(
            CSV_FILE_PATH
          );

        const text =
          await response.text();

        const csvData =
          parseCsv(text);

        const groupResult =
          findBestGrouping(
            csvData.prefectures,
            csvData.scores
          );

        setGroupResult(
          groupResult
        );

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div
          className="spinner-border text-primary"
          role="status"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );
  }

  const totalPages =
    Math.ceil(
      years.length /
        ROWS_PER_PAGE
    );

  const pagedYears =
    years.slice(
      (currentPage - 1) *
        ROWS_PER_PAGE,
      currentPage *
        ROWS_PER_PAGE
    );

  return (
    <div className="container-fluid my-4">
      <div className="card shadow mt-4 mb-4">
        <div className="card-header bg-secondary-subtle text-secondary-emphasis">
          <h1 className="h3 mb-0">
            友好度グループ分け
          </h1>
        </div>
        <div className="card-body">
          <p>実行ファイル {CSV_FILE_PATH}</p>
          <GroupingResult
            result={groupResult}
          />
        </div>
      </div>

      <div className="card shadow mb-4">
        <div className="card-header bg-secondary-subtle text-secondary-emphasis">
          <h1 className="h3 mb-0">
            首都圏人口一覧
          </h1>
        </div>

        <div className="card-body">
          <PopulationTable
            years={pagedYears}
            tableData={tableData}
            groups={
              groupResult?.groups ?? []
            }
          />
        </div>
      </div>

      <nav>
        <ul className="pagination justify-content-center">
          <li
            className={`page-item ${
              currentPage === 1
                ? "disabled"
                : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() =>
                setCurrentPage(
                  currentPage - 1
                )
              }
            >
              前へ
            </button>
          </li>

          {[...Array(totalPages)].map(
            (_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage ===
                  index + 1
                    ? "active"
                    : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    setCurrentPage(
                      index + 1
                    )
                  }
                >
                  {index + 1}
                </button>
              </li>
            )
          )}

          <li
            className={`page-item ${
              currentPage ===
              totalPages
                ? "disabled"
                : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() =>
                setCurrentPage(
                  currentPage + 1
                )
              }
            >
              次へ
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;