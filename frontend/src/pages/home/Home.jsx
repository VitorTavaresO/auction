import React from "react";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import { ListBox } from "primereact/listbox";
import "./Home.css";
import auctionClosed from "./mock-json/auction-closed.json";
import auctionList from "./mock-json/auction-list.json";

const calculateAverageArrobaValue = (data) => {
  const groupNames = Object.keys(data);
  const averages = groupNames.map((groupName) => {
    const group = data[groupName];
    const totalArrobas = group.reduce(
      (sum, auction) => sum + auction.arrobas,
      0
    );
    const totalBid = group.reduce(
      (sum, auction) => sum + (auction.finalBid || auction.actualBid),
      0
    );
    return totalBid / totalArrobas;
  });

  return { groupNames, averages };
};

const Home = () => {
  const { groupNames: closedGroupNames, averages: closedAverages } =
    calculateAverageArrobaValue(auctionClosed);
  const { groupNames: listGroupNames, averages: listAverages } =
    calculateAverageArrobaValue(auctionList);

  const allGroupNames = [...closedGroupNames, ...listGroupNames];
  const allAverages = [...closedAverages, ...listAverages];

  const lastFiveAuctions = Object.values(auctionClosed).flat().slice(-5);

  const auctionItems = lastFiveAuctions.map((auction, index) => ({
    label: `Arrobas: ${auction.arrobas} - Lance Final: R$${auction.finalBid}`,
    value: index,
  }));

  return (
    <>
      <div className="grid m-5">
        <div className="col-12 lg:col-4">
          <Card className="bg-gray-100 flex flex-column align-items-center justify-content-center text-center m-2 h-30rem">
            <h1>Média Boi Gordo</h1>
            <h2>Média Trimestre</h2>
            <h3 className="text-green-600">
              R${" "}
              {(
                closedAverages.reduce((a, b) => a + b, 0) /
                closedAverages.length
              ).toFixed(2)}
            </h3>
            <h2>Atual</h2>
            <h3 className="text-red-600">
              R${" "}
              {(
                listAverages.reduce((a, b) => a + b, 0) / listAverages.length
              ).toFixed(2)}
            </h3>
          </Card>
        </div>
        <div className="col-12 lg:col-8">
          <Card className="bg-gray-100 flex flex-column align-items-center justify-content-center text-center m-2 h-30rem">
            <Chart
              className="w-full h-full"
              type="line"
              data={{
                labels: allGroupNames,
                datasets: [
                  {
                    label: "Boi Gordo",
                    data: allAverages,
                    fill: false,
                    borderColor: "#ffd700",
                  },
                ],
              }}
              options={{
                legend: { display: true },
                scales: {
                  yAxes: [{}],
                },
              }}
            />
          </Card>
        </div>
        <div className="col-12 lg:col-4">
          <Card className="bg-gray-100 flex flex-column align-items-center justify-content-center text-center m-2 h-30rem">
            <h1>Últimos Arrematados</h1>
            <ListBox
              className=""
              value={null}
              options={auctionItems}
              style={{ width: "100%" }}
              listStyle={{ maxHeight: "250px" }}
              itemTemplate={(option) => (
                <div className="p-clearfix">
                  <span className="auction-label">{option.label}</span>
                </div>
              )}
            />
          </Card>
        </div>
      </div>
    </>
  );
};

export default Home;
