export default function Demo() {
  const handleChange = () => {
    console.log(`file`);
  };
  return (
    <div>
      <input type="file" onChange={handleChange} />
      <br />
      <button>Upload</button>
    </div>
  );
}
