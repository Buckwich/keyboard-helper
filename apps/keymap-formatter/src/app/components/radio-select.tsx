export function RadioButtonSelect({
  selectedOption,
  setSelectedOption,
  options,
  formName = 'options',
}: {
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  options: {
    label: string;
    value: string;
  }[];
  formName: string;
}) {
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="join">
      {options.map((option) => (
        <input
          key={option.value}
          className="join-item btn"
          type="radio"
          name={formName}
          value={option.value}
          checked={selectedOption === option.value}
          onChange={handleOptionChange}
          aria-label={option.label}
        />
      ))}
    </div>
  );
}
