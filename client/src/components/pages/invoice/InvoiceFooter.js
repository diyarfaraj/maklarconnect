import React from "react";

const InvoiceFooter = () => {
  const footerData = [
    {
      text: "www.MäklarConnect.com",
      link: "https://www.MäklarConnect.com",
    },
    {
      text: "invoice@MäklarConnect.com",
      link: "mailto:invoice@MäklarConnect.com",
    },
    {
      text: "(123) 123-456",
      link: "tel:+1123123456",
    },
  ];

  return (
    <>
      {footerData.map((data, index) => (
        <div className="col-auto" key={index}>
          <div className="invoice_footer_content text-center">
            <a className="ff-heading" href={data.link}>
              {data.text}
            </a>
          </div>
        </div>
      ))}
    </>
  );
};

export default InvoiceFooter;
