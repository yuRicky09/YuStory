import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserCircle,
  faUserEdit,
  faHome,
  faSignInAlt,
  faSignOutAlt,
  faBookmark as fasBookmark,
  faListUl,
  faBook,
  faSearch,
  faPencilAlt,
  faCamera,
  faLongArrowAltRight,
  faTags,
  faSave,
  faEye,
  faFileUpload,
  faTimes,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGoogle,
  faGithub,
  faGithubSquare,
} from "@fortawesome/free-brands-svg-icons";
import { faBookmark as farBookmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faUserCircle,
  faUserEdit,
  faGoogle,
  faGithub,
  faGithubSquare,
  faHome,
  faSignInAlt,
  faSignOutAlt,
  fasBookmark,
  farBookmark,
  faListUl,
  faBook,
  faSearch,
  faPencilAlt,
  faCamera,
  faLongArrowAltRight,
  faTags,
  faSave,
  faFileUpload,
  faEye,
  faTimes,
  faEllipsisV
);

Vue.component("font-awesome-icon", FontAwesomeIcon);
