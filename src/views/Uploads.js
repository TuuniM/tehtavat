import useUploadForm from '../hooks/UploadHooks';
const doUpload = () => {
  //
};

const Upload = () => {
  const {inputs, handleInputChange, handleSubmit} = useUploadForm(doUpload, {
    title: '',
    description: '',
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={inputs.title}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          value={inputs.description}
          onChange={handleInputChange}
        ></textarea>
        <input type="file" name="file" accept="image/*, audio/*, video/*"/>
      </form>
    </div>
  );
};

export default Upload;
