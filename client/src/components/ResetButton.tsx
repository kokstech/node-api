const ResetButton = (props: any) => {
  return (
    <button
      onClick={props.resetButtonHandler}
      className="btn btn-danger m-1 px-4 py-1"
    >
      play again
    </button>
  );
};

export default ResetButton;
