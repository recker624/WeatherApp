"use strict";
import { mapToStyles } from "@popperjs/core/lib/modifiers/computeStyles";
import { staticRenderer } from "./UIManager";
import { eventManager } from "./EventManager";
import "./styles/style.scss";

staticRenderer.setup();
eventManager.setup();
