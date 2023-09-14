import React from 'react';
import ReactApexChart from "react-apexcharts";

const Chart = ({paymentHistory}) => {

  let sortedPaymentHistory = [...paymentHistory];
  sortedPaymentHistory.sort((a, b) => new Date(a.datePaid) - new Date(b.datePaid));

  let paymentDates = []
    for(let i = 0; i < sortedPaymentHistory.length; i++) {
      const newDate = new Date(sortedPaymentHistory[i].datePaid);
      let localDate = newDate.toLocaleDateString();
      //let localDate = newDate.toISOString().split('T')[0];
            paymentDates = [...paymentDates, localDate]
    }


    let paymentReceived = []
    for(let i = 0; i < sortedPaymentHistory.length; i++) {
            paymentReceived = [...paymentReceived, sortedPaymentHistory[i].amountPaid]
    }
  


  const series = [

    {
      name: "Payment Recieved",
      data: paymentReceived,
    },
  ];
  const options = {
    chart: {
      zoom: { enabled: false },
      toolbar: {show: false},
    },
    dataLabels: {
      enabled: false,
    },

    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "category",
      //type: category,
      categories: paymentDates,
    },
    tooltip: {
      x: {
        format: "dd/MM/yy",
      },
    },
  };

  return (
    <div className='bg-zinc-200 text-center shadow-lg w-[90%] mx-3 my-auto p-3 rounded-lg'>
      <br />
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={300}
        
      />
    </div>
  )
}

export default Chart