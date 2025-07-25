import Header from "../components/headers/ErrorHeader";
import Footer from "../components/footers/HomeFooter";
import images from "../utils/images";
import "../css/error.css";
export default function Error() {
  return (
    <div>
      <Header />
      <main className="error-main">
    <div className="error-img">
        <img className="error-img-1" alt="error" src={images["High Visibility Mobile Detailing PDF.svg"]}/>
    </div>
<div className="not-found-container">
            <h1 className="NotFound">404 - Not Found</h1>
            <p className="page-info">The page you are looking for might have been removed, had its name changed, or does not exist.</p>
            <button className="link-button" onClick={() => window.location.href = "/"}>Back to Home Page</button>
            </div>
</main>
      <Footer />
    </div>
  );
}