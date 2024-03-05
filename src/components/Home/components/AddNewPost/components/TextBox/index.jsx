export default function TextBoxComponent({value, callback}) {
  return (
    <textarea
      cols="45"
      rows="3"
      style={{ resize: "none" }}
      value={value}
      onChange={callback}
    ></textarea>
  );
}
