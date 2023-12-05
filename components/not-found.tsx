import Image from "next/image";

const NotFoundPage = () => {
  return (
    <div>
      <div
        style={{
          width: "100%",
          height: 0,
          paddingBottom: "84%",
          position: "relative",
        }}
      >
        <Image
          src="https://giphy.com/embed/9J7tdYltWyXIY"
          width={50}
          height={50}
          alt="404 page"
        />
      </div>
      <p></p>
    </div>
  );
};

export default NotFoundPage;
