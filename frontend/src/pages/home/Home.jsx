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

const calculateTotalArremates = (data) => {
  const groupNames = Object.keys(data);
  const totalArremates = groupNames.reduce((sum, groupName) => {
    const group = data[groupName];
    const closedArremates = group.filter(
      (auction) => auction.status === "closed"
    );
    return sum + closedArremates.length;
  }, 0);

  return totalArremates;
};

const Home = () => {
  const { groupNames: closedGroupNames, averages: closedAverages } =
    calculateAverageArrobaValue(auctionClosed);
  const { groupNames: listGroupNames, averages: listAverages } =
    calculateAverageArrobaValue(auctionList);

  const totalArrematesFechados = calculateTotalArremates(auctionClosed);
  const totalArrematesMesAtual = calculateTotalArremates(auctionList);
  const totalArremates = totalArrematesFechados + totalArrematesMesAtual;

  const allGroupNames = [...closedGroupNames, ...listGroupNames];
  const allAverages = [...closedAverages, ...listAverages];

  const lastFiveAuctions = Object.values(auctionClosed).flat().slice(-5);

  const auctionItems = lastFiveAuctions.map((auction, index) => ({
    label: `Arrobas: ${auction.arrobas} - Lance Final: R$${auction.finalBid}`,
    value: index,
  }));

  const arrematesPorMes = [
    ...closedGroupNames.map((groupName) => {
      const group = auctionClosed[groupName];
      const closedArremates = group.filter(
        (auction) => auction.status === "closed"
      );
      return closedArremates.length;
    }),
    ...listGroupNames.map((groupName) => {
      const group = auctionList[groupName];
      const closedArremates = group.filter(
        (auction) => auction.status === "closed"
      );
      return closedArremates.length;
    }),
  ];

  return (
    <>
      <div className="grid m-1">
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
                    backgroundColor: "#ffd700",
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
            <h1>Arremates</h1>
            <h2>Total Fechados</h2>
            <h3 className="text-green-600">{totalArremates}</h3>
            <h2>Fechados Mês Atual</h2>
            <h3 className="text-green-600">{totalArrematesMesAtual}</h3>
            <h2>Abertos Mês Atual</h2>
            <h3 className="text-red-600">
              {Object.values(auctionList).flat().length -
                totalArrematesMesAtual}
            </h3>
          </Card>
        </div>
        <div className="col-12 lg:col-8">
          <Card className="bg-gray-100 flex flex-column align-items-center justify-content-center text-center m-2 h-30rem">
            <Chart
              className="w-full h-full"
              type="bar"
              data={{
                labels: allGroupNames,
                datasets: [
                  {
                    label: "Arremates por Mês",
                    data: arrematesPorMes,
                    backgroundColor: "#ffd700",
                  },
                ],
              }}
              options={{
                legend: { display: true },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
              }}
            />
          </Card>
        </div>
        <div className="col-12 lg:col-12">
          <Card className="bg-gray-100 flex flex-column align-items-center justify-content-center text-center m-2 h-30rem">
            <h1>Últimos Arrematados</h1>
            <ListBox
              className=""
              value={null}
              options={auctionItems}
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
