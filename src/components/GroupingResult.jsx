function GroupingResult({
  result,
}) {
  if (!result) {
    return null;
  }

const groupColors = [
  "bg-danger-subtle",
  "bg-info-subtle",
  "bg-success-subtle",
];
return (
  <div>

    <div
      className="accordion"
      id="groupingAccordion"
    >

      <div className="accordion-item">

        <h2 className="accordion-header">

          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#groupingResult"
          >
            グループ分け結果を表示
          </button>

        </h2>

        <div
          id="groupingResult"
          className="accordion-collapse collapse"
        >

          <div className="accordion-body">

            <div className="alert alert-success">

              <strong>
                最大友好度
              </strong>

              <span className="ms-2 badge bg-success">
                {result.score}
              </span>

            </div>

            {result.groups.map(
              (
                group,
                index
              ) => (

                <div
                  key={index}
                  className="card mb-3"
                >

                  <div
                    className={"card-header " + groupColors[index]}
                  >
                    <div className="d-flex justify-content-between">

                      <strong>
                        グループ
                        {index + 1}
                      </strong>

                      <span className="badge bg-dark">

                        友好度：
                        {result.groupScores?.[index] ?? 0}

                      </span>

                    </div>

                  </div>

                  <div className="card-body">
                    <ul className="mb-0">

                      {group.flatMap((pref1, i) =>
                        group
                          .slice(i + 1)
                          .map((pref2) => {

                            const score =
                              result.groupDetails?.[
                                index
                              ]?.find(
                                (detail) =>
                                  detail.from === pref1 &&
                                  detail.to === pref2
                              )?.score ?? 0;

                            return (
                              <li
                                key={`${pref1}-${pref2}`}
                              >
                                {pref1}
                                {" + "}
                                {pref2}
                                {" = "}
                                {score}
                              </li>
                            );
                          })
                      )}

                    </ul>
                  </div>

                </div>

              )
            )}

          </div>

        </div>

      </div>

    </div>

  </div>
);
}

export default GroupingResult;