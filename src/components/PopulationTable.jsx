function PopulationTable({
  years,
  tableData,
  groups,
}) {
  if (!years.length) {
    return null;
  }

  const prefectures =
    Object.keys(
      tableData[years[0]] || {}
    );

  const groupColors = [
    "bg-danger-subtle",
    "bg-info-subtle",
    "bg-success-subtle",
  ];

  const getGroupColor = (
    prefecture
  ) => {
    const groupIndex =
      groups.findIndex(
        (group) =>
          group.includes(
            prefecture
          )
      );

    if (groupIndex === -1) {
      return "";
    }

    return (
      groupColors[
        groupIndex %
          groupColors.length
      ]
    );
  };

  return (
    <div className="table-responsive population-table">

      <table className="table table-bordered table-hover">

        <thead className="table-light">

          <tr>

            <th className="">西暦</th>

            {prefectures.map(
              (prefecture) => (
                <th key={prefecture} className="">
                  {prefecture}
                </th>
              )
            )}

          </tr>

        </thead>

        <tbody>

          {years.map((year) => (

            <tr key={year}>

              <td className="fw-bold">
                {year}
              </td>

              {prefectures.map(
                (prefecture) => (

                  <td
                    key={
                      prefecture
                    }
                    className={"text-end " + getGroupColor(
                          prefecture
                        )}
                  >
                    {tableData[
                      year
                    ][
                      prefecture
                    ]?.toLocaleString()}
                  </td>

                )
              )}

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default PopulationTable;