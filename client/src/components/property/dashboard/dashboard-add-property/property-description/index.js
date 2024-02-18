"use client";
import Select from "react-select";

const PropertyDescription = ({ setPropertyDetails, propertyDetails }) => {
  const catergoryOptions = [
    { value: "Apartments", label: "Apartments" },
    { value: "Bungalow", label: "Bungalow" },
    { value: "Houses", label: "Houses" },
    { value: "Loft", label: "Loft" },
    { value: "Office", label: "Office" },
    { value: "Townhome", label: "Townhome" },
    { value: "Villa", label: "Villa" },
  ];
  const listedIn = [
    { value: "All Listing", label: "All Listing" },
    { value: "Active", label: "Active" },
    { value: "Sold", label: "Sold" },
    { value: "Processing", label: "Processing" },
  ];
  const PropertyStatus = [
    { value: "All Cities", label: "All Cities" },
    { value: "Pending", label: "Pending" },
    { value: "Processing", label: "Processing" },
    { value: "Published", label: "Published" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const handleSelectChange = (name, selectedOption) => {
    onChange({ [name]: selectedOption.map(option => option.value) }); // Assuming you want to store only the values
  };

  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#eb6753"
          : isHovered
            ? "#eb675312"
            : isFocused
              ? "#eb675312"
              : undefined,
      };
    },
  };

  return (
    <form className="form-style1">
      <div className="row">
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Enter title"
              value={propertyDetails.title}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* End .col-12 */}

        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Description
            </label>
            <textarea
              name="description"
              cols={30}
              rows={5}
              placeholder="There are many variations of passages."
              defaultValue={""}
              value={propertyDetails.description}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Select Category
            </label>
            <div className="location-area">
              <Select
                defaultValue={catergoryOptions.filter(option =>
                  propertyDetails.categories?.includes(option.value)
                )}
                name="colors"
                options={catergoryOptions}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                onChange={(selected) => handleSelectChange('categories', selected)}
                required
                isMulti
              />
            </div>
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Listed in
            </label>
            <div className="location-area">
              <Select
                defaultValue={[listedIn[1]]}
                name="colors"
                options={listedIn}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
                isMulti
              />
            </div>
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Property Status
            </label>
            <div className="location-area">
              <Select
                defaultValue={[PropertyStatus[1]]}
                name="colors"
                options={PropertyStatus}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
                isMulti
              />
            </div>
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              Price in $
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
            />
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              Yearly Tax Rate
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
            />
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              After Price Label
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
            />
          </div>
        </div>
        {/* End .col-6 */}
      </div>
    </form>
  );
};

export default PropertyDescription;
