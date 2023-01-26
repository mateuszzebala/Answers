import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "/node_modules/flag-icons/css/flag-icons.min.css";

import {
    faAtom,
    faCalculator,
    faComputer,
    faEarthAmerica,
    faFlask,
    faLandmark,
    faMusic,
    faPalette,
    faScaleUnbalancedFlip,
    faSuitcaseMedical,
    faDna,
    faLeaf
} from "@fortawesome/free-solid-svg-icons";



const icons_by_category = {
    "Matematyka":<FontAwesomeIcon icon={faCalculator}/>,
    "J. Polski":<span class="fi fi-pl"></span>,
    "J. Angielski": <span className="fi fi-gb"></span>,
    "J. Włoski":<span className="fi fi-it"></span>,
    "J. Francuski":<span className="fi fi-fr"></span>,
    "J. Rosyjski":<span className="fi fi-ro"></span>,
    "J. Niemiecki":<span className="fi fi-de"></span>,
    "Chemia":<FontAwesomeIcon icon={faFlask}/>,
    "Biologia":<FontAwesomeIcon icon={faDna}/>,
    "Geografia":<FontAwesomeIcon icon={faEarthAmerica}/>,
    "Fizyka":<FontAwesomeIcon icon={faAtom}/>,
    "Informatyka":<FontAwesomeIcon icon={faComputer}/>,
    "EDB":<FontAwesomeIcon icon={faSuitcaseMedical}/>,
    "Historia":<FontAwesomeIcon icon={faLandmark}/>,
    "Muzyka":<FontAwesomeIcon icon={faMusic}/>,
    "Plastyka":<FontAwesomeIcon icon={faPalette}/>,
    "WOS":<FontAwesomeIcon icon={faScaleUnbalancedFlip}/>,
    "Przyroda":<FontAwesomeIcon icon={faLeaf}/>
}
export default icons_by_category