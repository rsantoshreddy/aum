// Entry point for the build script
import { Turbo } from "@hotwired/turbo-rails"
// Disable Turbo Drive's navigation features but keep the rest of Turbo's functionality
Turbo.session.drive = false

import "./client/index"
