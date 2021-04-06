import useUploadForm from '../hooks/UploadHooks';

const Upload = () => {
  const doUpload = () => {
    const fd = new FormData();
    fd.append('title', inputs.title);
    fd.append('description', inputs.description);
    fd.append('file', inputs.file);
    const result = postMedia();
    console.log('doUpload', result);
  };

  const {inputs, handleInputChange, handleSubmit, handleFileChange} =
    useUploadForm(doUpload, {
      title: '',
      description: '',
      file: null,
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
        <input
          type="file"
          name="file"
          accept="image/*, audio/*, video/*"
          onChange={handleFileChange}
        />
        <button type="submit">Lähetä</button>
      </form>
    </div>
  );
};

export default Upload;
