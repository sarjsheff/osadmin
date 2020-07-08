import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import MUIDataTable from "mui-datatables";

const columns = [
  { name: "Name", label: "Имя" },
  { name: "Cost", label: "Цена" },
  { name: "ChassisName", label: "Модель" },
  { name: "ChassisVariant", label: "Вариант" },
  { name: "ChassisTonnage", label: "Вес" },
  { name: "ChassisWeightClass", label: "Класс" },
  { name: "ChassisTopSpeed", label: "Скорость" },
];

function MechTable() {
  const [data, setData] = useState([]);
  const options = {
    selectableRows: "none",
    onRowClick: (row) => {
      console.log(row);
    },
    textLabels: {
      body: {
        noMatch: "Пусто",
        toolTip: "Сортировка",
        columnHeaderTooltip: (column) => `Сортировка для ${column.label}`,
      },
      pagination: {
        next: "Следующая страница",
        previous: "Предидущая страница",
        rowsPerPage: "Строк на страницу:",
        displayRows: "из",
      },
      toolbar: {
        search: "Поиск",
        downloadCsv: "CSV",
        print: "Печать",
        viewColumns: "Колонки",
        filterTable: "Фильтр",
      },
      filter: {
        all: "Все",
        title: "ФИЛЬТРЫ",
        reset: "СБРОС",
      },
      viewColumns: {
        title: "Показать колонки",
        titleAria: "Показать/Спрятать колонки",
      },
      selectedRows: {
        text: "строк выбрано",
        delete: "Удалить",
        deleteAria: "Удалить выбраные строки",
      },
    },
  };
  useEffect(() => {
    fetch("http://localhost:3001/")
      .then((a) => a.json())
      .then((j) => {
        console.log(j);
        setData(
          j.map((e) => {
            return {
              ChassisName: e.chassis.Name,
              ChassisVariant: e.chassis.VariantName,
              ChassisTonnage: e.chassis.Tonnage,
              ChassisWeightClass: e.chassis.weightClass,
              ChassisTopSpeed: e.chassis.TopSpeed,
              ...e,
              Name: e.Name.length > (e.UIName || "").length ? e.Name : e.UIName,
            };
          })
        );
      });
  }, []);
  return (
    <MUIDataTable
      title={`Mechs`}
      data={data}
      columns={columns}
      options={options}
    />
  );
}

export default MechTable;
