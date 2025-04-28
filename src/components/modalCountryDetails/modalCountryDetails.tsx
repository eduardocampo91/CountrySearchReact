import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
interface Props {
    show: boolean;
    onHide: () => void;
    country: any;
  }

  
function ModalCountryDetail({ show, country, onHide }: Props) {
    return (
        <Modal show={show} onHide={onHide}>
          <Modal.Header closeButton>
            <Modal.Title>{country.name}</Modal.Title>
          </Modal.Header>
    
          <Modal.Body>
            <p><strong>Code:</strong> {country.code}</p>
            <p><strong>Name:</strong> {country.name}</p>
            <p><strong>Currency:</strong> {country.currency}</p>
            <p><strong>Continent:</strong> {country.continent.name}</p>
            <p><strong>Capital:</strong> {country.capital}</p>
            <p><strong>Languages:</strong> {country.languages.map((lang: any) => lang.name).join(", ")}</p>
          </Modal.Body>
    
          <Modal.Footer>
            <Button data-testid="footer-close-btn" variant="secondary" onClick={onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      );
}

export default ModalCountryDetail;