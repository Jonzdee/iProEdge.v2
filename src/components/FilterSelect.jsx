import Select from 'react-select';

const FilterSelect = ({ setFilterList, products, categories }) => {
    const options = categories.map(cat => ({
        value: cat,
        label: cat.replace(/\b\w/g, l => l.toUpperCase()), // Capitalize
    }));

    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: "#0f3460",
            color: "white",
            borderRadius: "5px",
            border: "none",
            boxShadow: "none",
            width: "200px",
            height: "40px",
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#0f3460" : "white",
            color: state.isSelected ? "white" : "#0f3460",
            "&:hover": {
                backgroundColor: "#0f3460",
                color: "white",
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "white",
        }),
    };

    const handleChange = (selectedOption) => {
        setFilterList(products.filter(item => item.category === selectedOption.value));
    };

    return (
        <Select
            options={options}
            placeholder="Filter By Category"
            styles={customStyles}
            onChange={handleChange}
        />
    );
};

export default FilterSelect;