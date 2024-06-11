**June 11, 2024 [DESCW-2400](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-2400)**

- Backend
  - Refactor Model, replace route and controller with generics
  - update model output to match necessary fields in Access report example PDF

- Frontend
  - update selector to only use Excel exports of the tab 17 report
  - disable PDF export
  - build Excel template for the tab 17 data.

**June 10, 2024 [DESCW-2397](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-2397)**

- Backend
  - Refactor Model, replace route and controller with generics
  - update model output to match necessary fields in Access report example PDF

- Frontend
  - update selector to only use Excel exports of the tab 17 report
  - disable PDF export
  - build Excel template for the tab 17 data.

**February 13, 2024 [DESCW-2009](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-2009)**

- Backend
  - Fix misconfigured route for projects/contacts/:id
- Frontend
  - Change formConfig to reference this route

**February 6, 2024 [DESCW-1989](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1989)**

- Added custom database logging functionality
- !important run migrations to create new db_logs table

**February 2, 2024 [DESCW-1602](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1602)**

- Documentation
  - documented the Layout/Main Component
  - updated its docblock comment and types for the component

**February 1, 2024 [DESCW-1601](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1261)**

- Documentation
  - documented the ReadField Component
  - updated its docblock comment and types for the component

**January 31, 2024 [DESCW-1261](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1261)**

- Frontend
  - Built .xlsx template for the tab 27 report, and adjusted styling for clarity
- Backend
  - Built tab 27 model to grab report, total, and count of results for template

**January 23, 2024 [DESCW-1945](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1945)**

- Frontend
- Backend
  - Added ability to add ultiple values to project change request types.

**January 23, 2024 [DESCW-1896](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1896)**

- Frontend
- Backend
  - added multiselect option to autocomplete table.
  - added new autocomplete component to project cr section

**January 22, 2024 [DESCW-1928](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1928)**

- Frontend
  - get the contract > deliverables > project deliverables tableselect populating

**January 18, 2024 [DESCW-1836](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1836)**

- Frontend
  - fix bug related to hook calling order by moving the call to formConfig() above the component render

**January 18, 2024 [DESCW-1591](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1591)**

- Frontend
  - Update Docblock comment for Select component
- Documentation
  - Adds documentation for Select component
  - Recovered missing documentation for AutocompleteTable component

**January 18, 2024 [DESCW-1835, 1837](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1835) (<https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1837>)**

- Frontend
  - fix bug causing a null value warning on TextArea inputs in product detail forms.
  - fixed bug with mui dataepicker warning of Mask does not support numbers with variable length such as 'M'.
    Either use numbers with fix length or disable mask feature with 'disableMaskedInput' prop
    Falling down to uncontrolled no-mask input.

**January 18, 2024 [DESCW-1886](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1886)**

- Frontend
- Backend
  - Fixed bugs with adding new item, reordered inputs, updated input type to be correct

**January 17, 2024 [DESCW-1882](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1882)**

- Frontend
  - fix formatting on table cells so the text will wrap automatically
  - adjust column header wrap on some table(s) as well.

**January 17, 2024 [DESCW-1883](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1883)**

- Frontend
- Backend
  -added ead only money field for invoice total on the read and edit form for contract invoice processing.

**January 17, 2024 [DESCW-1887](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1887)**

- Frontend
  - make new title card component
  - add title card to invoice processing > hourly / fixed price tables.

**January 16, 2024 [DESCW-1715](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1715)**

- Frontend
  - update the form config for project>budget>Change Section> Contract dropdown table
- Backend
  - update picker options to include the required query
  - update budget model to include the required query

**January 16, 2024 [DESCW-1833](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1833)**

- Frontend
  - reformatted table column widths to be narrow for health chips in app
  - added word-wrap to column titles for the columns affected by this narrowing
  - added utility component <LineBreak> for rendering table headers with a linebreak

**January 13, 2024 [DESCW-1829](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1829)**

- Frontend
  - Added new custom generate value button for textfield input
- Backend
  - Added functionality to generate next cr-version for project change requests

**January 11, 2024 [DESCW-1899](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1899)**

- Frontend
- Backend
  - Fixed issue with budget display title showing undefined.

**January 10, 2024 [DESCW-1894](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1894)**

- Frontend
  - Added required property to money field
  - Fixed issue with adding new items to tables
  - Made adding and editing table rows for efficient
  - Fixed validation for project section fields
- Backend
  - Fixed reportedby picker options to by more accurate
  - Fixed billingProgramArea picker options to by more accurate
  - Added program area value to the program_area option for project billing section

**January 10, 2024 [DESCW-1813](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1813)**

- Frontend
- Backend
  - Added Program Area component to project billing section

**January 10, 2024 [DESCW-1789](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1789)**

- Frontend
  - Convert billing amount field to moeny type input
- Backend
  - added dynamic validation logic for amount field

**January 9, 2024 [DESCW-1791](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1791)**

- Frontend
- Backend
  - Added Project Status Table Select component to project budget section

**January 8, 2024 [DESCW-1716](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1716)**

- Frontend
- Backend
  - Added Recovery Area Table Select component to project budget section

**January 5, 2024 [DESCW-1804](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1804)**

- Frontend
  - Changed order of inputs in project budget form.

**January 5, 2024 [DESCW-1831](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1831)**

- Frontend
  - Changed order of inputs in project status form.

**January 5, 2024 [DESCW-1828](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1828)**

- Frontend
  - Changed order of inputs in project change request form.
    - Added 'version' and 'types' to form.

**January 5, 2024 [DESCW-1811](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1811)**

- Frontend
  - Changed order of inputs in project billing form.

**January 4, 2024 [DESCW-1827](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1827)**

- Frontend
  - Changed order of columns in project change request table

**January 4, 2024 [DESCW-1830](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1830)**

- Frontend
  - Add forecast column to project status table

**January 4, 2024 [DESCW-1808](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1808)**

- Frontend
  - Changed order of columns in project deliverables table

**January 4, 2024 [DESCW-1810](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1810)**

- Frontend
  - Changed order of columns in project billing table

**January 3, 2024 [DESCW-1807](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1807)**

- Frontend
  - Changed order of columns in project client coding table

**January 3, 2024 [DESCW-1805](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1805)**

- Changed portfolio breakdown column "portfolio name" to "recovery area".

**January 3, 2024 [DESCW-1803](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1803)**

- Changed fiscal breakdown column title from "total detail amount" to "recovery amount".

**January 3, 2024 [DESCW-1599](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1599)**

- Documentation
  - document InputForm component.
  - add docblock comment to InputForm

**January 3, 2024 [DESCW-1803](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1803)**

- Changed fiscal breakdown column title from "total detail amount" to "recovery amount".

**January 2, 2024 [DESCW-1598](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1598)**

- Documentation
  - document FormRenderer component. - updates docblock comment inside FormRenderer.
  - updates FormLayout and GridItem documentation to make it consistent.

**January 2, 2024 [DESCW-1597](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1597)**

- Documentation
  - document GridItem component.

**January 2, 2024 [DESCW-1596](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1596)**

- Documentation
  - Documents usage and props of FormLayout, a grid-based form layout container component.

**December 18, 2023 [DESCW-1834](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1834)**

- Frontend
  - removes Autocomplete console warning for non-atomic input values (e.g. objects)
  - see: <https://mui.com/material-ui/react-autocomplete/#free-solo>

**December 18, 2023 [DESCW-1752](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1752)**

- Create build configuration for backup container images.

**December 18, 2023 [DESCW-1590](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1590)**

- Documentation
  - Adds documentation for MoneyField component.

**December 15, 2023 [DESCW-1715](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1715)**

- Frontend Backend
  - Added AutoComplete dropdown to project budget contract input

**December 15, 2023 [DESCW-1701](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1701)**

- Frontend Backend

  - Added Read-Only Fields for Responsibility Center and Service Line in project budget form
    **December 14, 2023 [DESCW-503](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-503)**

- github
  - Added code coverage check for frontend

**December 14, 2023 [DESCW-1702](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1702)**

- Frontend Backend
  - Added program area picker for project budget view/edit forms.

**December 14, 2023 [DESCW-395](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-395)**

- Frontend
  - Removed Sass from the app

**December 14, 2023 [DESCW-1259](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1259)**

- Frontend
  - fix whitescreen bug after report 'export xls' button is clicked
  - add fiscal and quarter (required) parameters to the selector on the report page
  - build custom excel template for the report.
- Backend
  - build model to extract the report data from the sql and send it to the controller/view

**December 14, 2023 [DESCW-1699](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1699)**

- Frontend
  - Bug fixes for moneyfield
  - Added custom on change functionality to moneyfield
  - Added validation error message display to read only fields
  - Added validation schema for project budget fields
  - added realtime total diaply for quarterly recovered amounts

**December 7, 2023 [DESCW-1792](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1792)**

- Frontend
  - Fixed new form functionality by adding more accurate conditional rednering.

**December 6, 2023 [DESCW-1697](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1697)**

- Frontend Backend
  - better organzied picker options by project, contract,
  - fixed bugs with autocomplete table.
  - added autcomplete table to project budget section

**December 1, 2023 [DESCW-1774](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1774)**

- Frontend Backend
  - Added better error handling

**November 30, 2023 [DESCW-1772](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1772)**

- fix for project contacts section

**November 29, 2023 [DESCW-1700](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1700)**

- Add Yup validation to STOB input in budget section of projects.

**November 29, 2023 [DESCW-1696](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1696)**

- Frontend
  - Added new Autocomplete table dropdown

**November 29, 2023 [DESCW-1728](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1728)**

- Update Axios to 1.6.2.

**November 24, 2023**

- removed reference to debug component

**November 24, 2023 [DESCW-1589](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1589)**

- Documentation
  - forms/fields/checkbox component
  - delete config orphan for Debug component
  - add Fields folder to documentation's react_components

**November 24, 2023 [DESCW-1586](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1586)**

- Frontend
  - remove the Debug Component

**November 23, 2023 [DESCW-1695](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1695)**

- Frontend
  - adjust order of inputs on the form for project budget
- Backend
  - add total to model
  - add total to validator

**November 22, 2023 [DESCW-432](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-432)**

- backend
  - dependabot .yaml to track security/bug updates on the postgres, api, app, and s2i images

**November 21, 2023 [DESCW-1698](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1698)**

- frontend
  - Added reusable form yup validation

**November 21, 2023 [DESCW-1735](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1735)**

- git workflows
  - update references
- backend
  - Added project close-out notification functionality
  - Combined project manager fields for project table and project contact table

**November 22, 2023 [DESCW-1735](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1735)**

- git workflows
  - update references

**November 21, 2023 Documentation: minor edit**

- Documentation
  - update frontend deploy instructions to use yarn instead of npm

**November 21, 2023 [DESCW-1735](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1735)**

- Devops
  - updated postgres image base to be in buildconfig
  - slight modification to frontend Dockerfile
- Documentation
  - Instruction on where to update base images for node, nginx and postgres

**November 21, 2023 [DESCW-376](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-376)**

- Devops
  - Added Openshift api-build-pipeline trigger configs

**November 21, 2023 [DESCW-1735](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1735)**

- Devops
  - re-factored build images
  - removed unused OpenShift templates
  - consolidated build/runs, now only run for each image

**November 20, 2023 [DESCW-1735](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1735)**

- Devops
  - consolidate Dockerfile for api/app
  - cleanup run file for api

**November 20, 2023 [DESCW-943](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-943)**

- Frontend
  - update local deployment documentation

**November 9, 2023 [DESCW-1584](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1584)**

- Added docs for ConfirmationDialog and DeleteButton

**November 9, 2023 [DESCW-1682](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1682)**

- Move configurations that should be secretes into secretes
- updated deployment for api

**November 8, 2023 [DESCW-1549](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1549)**

- Removed backend README

**November 8, 2023 [DESCW-1685](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1685)**

- Removed all references to postgres_regular_user account

**November 2, 2023 [DESCW-1687](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1687)**

- Documentation
  - Kubernetes and OpenShift deploymentsß
  - Image builds
- Cleaned up readme's within OpenShift and images
- Remove unused OpenShift deployments using templates.

**November 2, 2023 [DESCW-1688](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1688)**

- Deployments
  - Re-organize

**November 2, 2023 [DESCW-1580](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1580)**

- Frontend
  - Added documentation for project budget display
- Backend
  - Added notify functionality for project close out notify

**November 2, 2023 [DESCW-1516](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1516)**

- Backend
  - Added notify functionality for project close out notify

**November 1, 2023 [DESCW-1687](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1687)**

- Backend
  - Moved the docker-compose.yaml to the backend, in order to use the .env file
  - Update the sample.env
- Documentation
  - Create a Getting Started Developer documentation
- Update repo README.md to point to gh_pages

**October 31, 2023 [DESCW-1443](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1443)**

- Frontend
- Backend
  - Added user section to the app that connects to the single sign on service.

**October 31, 2023 [DESCW-1629](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1629)**

- Frontend
- Backend
  - Upgraded @jest to fix vulnerability with @babel/traverse

**October 26, 2023 [DESCW-859](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-859)**

- Frontend
  - Created new reusable health legend
  - Added new health legend to Project Deliverables section

**October 25, 2023 [DESCW-1658](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1658)**

- Frontend
- Backend
  - Added Project Code input for Project Client Coding section
  - Reordered the inputs for the Project Client Coding section
  - Swapped the signed date with the start date in the Project Agreement section

**October 25, 2023 [DESCW-1658](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1658)**

- Frontend
- Backend
  - Reordered the inputs for the project deliverables section

**October 25, 2023 [DESCW-1658](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1658)**

- Frontend
  - Added new read field type "multi select"
- Backend
  - Fix lingo for Project agreement summary input from Total Recovered Amount - “Total Recoverable Amount"
  - Changed order of project contacts inputs

**October 24, 2023 [DESCW-1333](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1335)**

- Frontend

  - Changed 'Initiation Date' to 'Registration Date' in Project Details
  - Changed 'Recovery' to 'Recovery Details' in Project Details
  - Changed date format in Project Registration to DD-MMM-YY (ex. 01-Jan-21)
  - Changed date format in Project Registration 'Change Section' modal to DD-MMM-YY (ex. 01-Jan-21)

    **October 23, 2023 [DESCW-1333](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1333)**

- Frontend
  - add error message (alert) for users that enter an invalid (already existing) project number
- Backend
  - add migration on project_number to make it unique

**October 18, 2023**

- Updated Documentation Structure to be more in line with code layout.

**October 17, 2023 [DESCW-1546](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1546)**

- Meta
  - Added documentation for changing postgres passwords to vuepress.

**October 17, 2023 [DESCW-1453](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1453)**

- Frontend
- Backend
  - fixed some broken inputs in contract section

**October 17, 2023 [DESCW-1548](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1548)**

- Frontend
  - Updated react-scripts to 5.0.1.
  - Removed references to 'dotenv' in frontend src.
    - React natively uses dotenv for .env variables beginning with `REACT_APP_` and thus it should not be included in frontend src.
  - Added ability to silence warnings caused by the update: run `npm run start:nomap`
    - React no longer supports source maps without polyfill. Our only options going forward are to remove source maps from our package (use the command above) or to use dependencies which themselves address this problem. See [here](https://github.com/facebook/create-react-app/discussions/11767#discussioncomment-1969071).

**October 16, 2023 [descw-1336](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1336)**

- Frontend
  - add 'null' type to validators for Project Details dates
  - remove 'Agreement' from Deliverables section 'change details' modal dialog

**October 13, 2023 [descw-1455](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1455)**

- Frontend
  - change column header from 'Contract' to 'Amendment Number' in Admendments tab of Contracts section

**October 13, 2023 [DESCW-1403](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1403)**

- Frontend
  - tab 42 template
  - enable XLS report output for tab 42
  - workaround a babel-preset-react-app package dependency issue to silence a warning
- Backend
  - tab 42 model added
  - model uses generic controller
  - the query is based on the query from Gary's spreadsheet

**October 11, 2023 [DESCW-1452](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1452)**

- Frontend
- Backend
  - fixed contracts section missing columns

**October 6, 2023 [DESCW-1517](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1517)**

- Frontend
- Backend
  - Added update functionality to project closeout.

**October 5, 2023 [DESCW-1513](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1513)**

- Backend
  - fixed role check on closeout route
  - remove instances of userRequires from controllers
  - delete controllers that are no longer used
  - verify role checks on routes used by legacy report controllers
  - re-run npm install on /frontend to fix some dependency issues caused in documentation package.json
  - some comments and minor fixes
- Frontend
  - add API documentation to frontend documentation site

**October 5, 2023 [DESCW-1511](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1511)**

- Frontend
- Backend
  - Fixed issue with project Budget display and data

**October 3, 2023 [DESCW-1454](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1454)**

- Frontend
  - Fixed issue with contract deliverable name not showing.
  - Fixed issue with admin contact job title not showing.
  - Added required field to subcontractor name to resolve adding empty name
  - Fixed issue with admin ministry active display only showing no.
  - Fixed issue with notes not displaying for project reg.

**October 2, 2023 [DESCW-1474](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1474)**

- Frontend
  - Added a new Money field Type that can be used on all input forms.
- Backend
  - Updated validators for project details to resolve currency diplay issue

**June 07, 2023 [DESCW-1514](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1514)**

- Backend
  - upgrade openShift postgresql to v15.4-bullseye

**September 28, 2023 [DESCW-1532](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1532)**

- Frontend
  - update openshift build configs for APP images to v.18.18-alpine3.18
  - update node version to >= v18.18.0
  - update github actions version to v18.18 or lts (by default)
  - test github actions on PR commits using node v18.18

**September 28, 2023**

- Added VuePress documentation intial site.

**September 27, 2023 [DESCW-1498](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1498)**

- OpenShift
  - Add base templates for openshift kustomize images.

**September 27, 2023 [DESCW-1533](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1533)**

- Backend
  - update node version to lts/hydrogen (v.18.18.0)
    - package.json
    - openshift build configs for API
    - documentation
    - github actions

**September 20, 2023 [DESCW-1246](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1246)**

- Backend
  - Update GitHub Actions to use the latest versions of workflow@v3 and checkout@v4 (DESCW-1246)
  - This update includes the latest versions of these actions, which are passing tests on their respective GitHub repositories as of 2021-03-10.

**September 20, 2023 [DESCW-1316](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1316)**

- Frontend
  - Modified tab 1 report to take new model data
  - slight tweaks to template formatting
- Backend
  - Added model for tab 1 report
  - Removed old model, controller, and route
  - Created Bug Ticket DESCW-1527 to request queries for the missing Payment Summary info

**September 19, 2023 [DESCW-1287](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1287)**

- Frontend
  - Added option for tab 11 report
- Backend
  - Added model for tab 11 report
  - Added .xlsx template for tab 11 report

**September 19, 2023 [DESCW-864](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-864)**

- Frontend
  - Fix bug preventing Close Out page from displaying
  - Add checkbox & notify button components to closeout page
  - Use a conditional to make the button & checkbox hide when Admin/Editor views the page
- Backend
  - update controller, route, and validator to use keycloak permissions to hide the component
  - add instructions for deploying to dev/test to README in documentation

**September 17, 2023 [DESCW-1286](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1286)**

- Frontend
  - Added option for tab 10 report
- Backend
  - Added model for tab 10 report
  - Added .xlsx template for tab 10 report

**September 14, 2023 [DESCW-1447](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1447)**

- Backend

  - tweak date format utils:
    - clean up generic report controller
    - clean up getCurrentDate() utility function in controllers/reports/helpers
      - import formatDate instead of imperative code
    - import date format constants to models/reports/helpers

- Frontend
  - make all forms display date in proper format
  - make all tables display date in SORTABLE proper format using valueFormatter()
- Backend
  - make all Project models not format the date
  - make all Contract models not format the date

**September 12, 2023 [DESCW-1286](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1286)**

- Frontend
  - Add report selector for tab 8 report.
  - Add subcontractor parameter for reports.
- Backend
  - build model for tab 8 report.

**September 11, 2023 [DESCW-1284](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1284)**

- Frontend
  - add new option to select Contractor resource (resource.id)
  - add frontend config for menu selector
- Backend
  - build model from gary's query

**September 5, 2023 [DESCW-1268](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1268)**

- Frontend
- [x] configure front end menu option for the report
- Backend
- [x] take query and modify it so it takes the parameter(s) and outputs the expected rows
- [x] delete old route, and controller
- [x] replace model logic based on model boilerplate file
- [x] re-build .docx template based on new columns from new model plus old template
- [x] build .xlsx template based on columns from model and .xlsx generic template

**September 5, 2023 [DESCW-1267](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1267)**

- Frontend

  - fix 'no key for repeated components' bug on frontend menu selector for reports
  - build tab 32 XLS template
  - configure tab 32 menu selector
  - rename and re-arrange menu items into proper category and order
  - delete old docx template which was missing totals & subtotals
  - build docx and excel templates from 'scratch'

- Backend
  - fix report timeout bug ( 5000ms -> 10000ms)
  - make utility function to format dates to standard format (using dayjs library)
  - erase old model, route, controller
  - build model from gary's query
  - delete temp sql query file

**August 31, 2023 [DESCW-1273](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1273)**

- Frontend

  - build tab 41 XLS template
  - configure tab 41 menu selector

- Backend
  - set up tab 41 model

**August 30-, 2023 [DESCW-1220](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1220)**

- Frontend
  - Added frontend parameter validation for reports.
    - Validation only prevents form from submitting, not API.

**August 25, 2023 [DESCW-46](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-46)**

- Openshift
  - Added migration for enabling pgaudit
  - Updated openshift config to allow use of custom postgresql.conf

**August 24, 2023 [DESCW-46](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-46)**

- Openshift
  - Enabled pgaudit through yaml config file for auditing SQL queries

**August 23, 2023 [DESCW-1272](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1272)**

- Frontend

  - build tab 40 XLS template
  - configure tab 40 menu selector

- Backend
  - set up tab 40 model
  - update docblock comment on 'getReportWithSubtotals' utility function with example

**August 23, 2023 [DESCW-1271](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1271)**

- Frontend

  - build tab 30 XLS template
  - configure tab 30 menu selector

- Backend
  - set up tab 30 model

**August 23, 2023 [DESCW-1270](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1270)**

- Frontend

  - delete Login.tsx
  - build tab 29 XLS template
  - move tab 29 menu selector JSON
  - order menu items sequentially for divisional project reports
  - move tab 29 from wrong section and rename it

- Backend
  - set up tab 29 model

**August 23, 2023 [DESCW-1269](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1269)**

- Frontend

  - fix frontend template for DOCX so it looks like XLS template
  - rebuild tab 22 (change request types) DOCX template
  - build tab 22 XLS template
  - move tab 22 menu selector JSON
  - order menu items sequentially for divisional project reports
  - move tab 22 from wrong section and rename it
  - fix some linter warnings

- Backend
  - set up tab 22 model
  - DELETE old change request types model
  - DELETE old change request types controller
  - DELETE old change request types route
  - DELETE temporary tab 22 query

**August 22, 2023**

- Frontend
  - revert changes to typescript `<any>` type on the useQuery hook that caused a TS compiler error

**August 22, 2023 [DESCW-1281](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1281)**

- Frontend
  - Tweaked picker options for tab 4 report
- Backend
  - Added model for tab 4 report
  - Added .xlsx template for tab 4 report

**August 22, 2023 [DESCW-856](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-856)**

- Frontend
  - Added option for adding links to read form
  - Added contract link to project registration section

**August 22, 2023 [DESCW-856](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-856)**

- Frontend
  - Added option for adding links to read form
  - Added contract link to project registration section

**August 22, 2023 [DESCW-1283](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1283)**

- Backend
  - refactor model boilerplate
  - set up tab 6 model
- Frontend
  - tweak selector for report parameter
  - build menu select option for tab6 report (incl. description from spreadsheet)
  - fix tab 5 menu option title
  - resolve some minor frontend linter warnings

**August 21, 2023**

- Backend
- Frontend
  - Added delete functionality to project budget
  - Added delete functionality to contract invoice processing
  - Added delete functionality to contract resources
  - Added delete functionality to contract deliverables
  - Added new dialog modal for forms
  - Removed old for modal

**August 18, 2023**

- Backend

  - build tab 5 model
  - remove .docx templates completed markdown file (unneeded)
  - delete sql scratch file for tab 5 rpt
  - optimize operations on the queries object for future report

- Frontend
  - make generic report template cleaner and simpler
  - tweak selector for report parameter to fiscal
  - build menu select option for Tab 5 report
    - description from priority order spreadsheet

**August 17, 2023**

- Backend
  - set up tab 3 model
  - clean up tab 3 model a bit
  - refactor some utility functions
    - move `getReportWithSubtotals` to models folder
    - tweak tab 31 model imports to use getReportWithSubtotals from its new home
- Frontend
  - tweak selector for report parameter
  - build menu select option for tab3 report (incl. description from spreadsheet)

**August 16, 2023**

- Backend
  - Fixed a bug that was not allowing multiselect report parameters to include more or less than exactly one selection.
  - Added a helper function .whereInArray() for reports for easily filtering on multiselect parameters.
    - See `/backend/src/models/reports/helpers/index.js` for usage.

**August 16, 2023**

- Backend
  - Tab 2 model
  - add `getReportWithSubtotals` utility function to helper
  - refactor SELECT clause of query to use DISTINCT to weed out identical rows
  - tweak tab 31 model to extract the subtotal folding method from the model
- Frontend
  - Tab 2 template
  - create new menu selector option for tab 2 report
  - add description from LAN priority list spreadsheet
  - adjust formatting on tab31 template

**August 16, 2023**

- Frontend
  - Fixed cancel functionality for forms

**August 15, 2023 [DESCW-1426](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1426)**

- Frontend
  - Fixed issue with project contact rendering and saving changes

**August 14, 2023 [DESCW-1278](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1278)**

- Frontend
  - Tweaked picker options for tab 9 report
- Backend
  - Added model for tab 9 report
  - Added .xlsx template for tab 9 report

**August 11, 2023 [DESCW-857](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-857)**

- Frontend, Backend
  - Added project budget total to project deliverables section

**August 11, 2023 [DESCW-857](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-857)**

- Frontend, Backend
  - Added project budget total to project deliverables section

**August 10, 2023 [DESCW-1263](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1263)**

- Frontend
  - Tweaked picker options for tab 39 report
- Backend
  - Added model for tab 39 report
  - Added .xlsx template for tab 39 report

**August 10, 2023 [DESCW-1256](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1256)**

- Frontend
  - Tweaked picker options for tab 36 report
- Backend
  - Added model for tab 31 report
  - Added .xlsx template for tab 31 report
  - Experimented with Class for reports and error handling

**August 10, 2023 [DESCW-1262](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1262)**

- Frontend
  - Tweaked picker options for tab 28 report
- Backend
  - Added model for tab 28 report
  - Added .xlsx template for tab 28 report
  - Fixed a comment typo for tab 36 report

**August 10, 2023 [DESCW-861](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-861)**

- Frontend, Backend
  - Added portfolio budget breakdown for project section
  - Added deliverables breakdown for project section

**August 9, 2023 [DESCW-1265](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1265)**

- Frontend
  - Tweaked picker options for tab 36 report
- Backend
  - Added model for tab 36 report
  - Added .xlsx template for tab 36 report

**August 9, 2023 [DESCW-861](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-861)**

- Frontend
  - Added fiscal budget breakdown for project section

**August 8, 2023 [DESCW-1388](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1388)**

- Frontend
  - Added create new function for contract section

**August 4, 2023 [DESCW-1264](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1264)**

- Backend
  - Add model for tab 44 report
  - update documentation and clean up (rename) generic model boilerplate
  - clean up generic controller doc block and debugging code
- Frontend
  - Tweak picker options for tab 44 report

**August 3, 2023 [DESCW-1265](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1265)**

- Backend
  - Add model for tab 37 report
- Frontend
  - Tweak picker options for tab 37 report

**August 2, 2023 [DESCW-1317](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1317)**

- Backend
  - delete controller for tab 13 report
  - Add model for tab 13 report
- Frontend
  - Add picker options for tab 13 report

**August 2, 2023 [DESCW-1366](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1366)**

- Backend
  - delete controller
  - delete route
  - refactor model to return promise data to generic controller
  - add some error handling to the model
  - get model to require specific portfolio & fiscal year in order to work
  - refactor model for easy(easier) reading

**July 31, 2023 [DESCW-1365](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1365)**

- Backend
  - update generic model template
  - update generic controller template
    - add (temporary) debugging for incoming model data
  - refactor groupByProperty util
    - add comments to make it easier to read
    - add default parameters to the function signature
    - fix strange timeout caused by failing _.isEmpty() or_.groupBy
  - delete tab 48 route and controller (using generic)
  - refactored Tab_48 model
    - replace all queries ( using Gary's Queries)
    - use knex to reference report query for subtotal and totals queries
    - add error handling to the model
  - fixed error with fiscal_year model for tab38, and added error handling
  - build model for tab 38
  - sneaky edit on readme - Kyle plans to update the seeding/migration docs later

**July 25, 2023**

- Frontend
  - Fix theme types errors

**July 24, 2023 [DESCW-1330](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1330)**

- Backend
  - update getCurrentDate() to return local Date

**July 24, 2023 [DESCW-`1331`](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1331)**

- Frontend
  - Added fix that removed parameters if you change type.
  - Added react router protected route to report routes

**July 21, 2023**

- Meta
  - Added instructions to README for updating migrations and seeds.

**July 21, 2023 [DESCW-1235](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1235)**

- Frontend
  - update bcsans to 2.0.0
  - Add fixes for react router private routes
  - UPdated table components for admin resources section
  - Removed all old code and add playground code to main components directory

**July 21, 2023 [DESCW-1252](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1252)**

- Frontend
  - enables quarter & fiscal year parameters for project jvs per fiscal/quarter rpt
  - adds tab 38 template
- Backend
  - removes fancy stuff from generic model template
  - build model for tab 38
  - sneaky edit on readme - Kyle plans to update the seeding/migration docs later

**July 20, 2023 [DESCW-1368](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1368)**

- **Note**

  - Delete your local gat_db database
  - Create a new gat_db
  - Pull latest version of sql to postgres converter
    - connect to the VPN
    - run npm run make seeds
    - Copy .dat file from sql converter repo to your local agreements tracker production seeds folder
  - run migrations and seeds

- Frontend
  - Fixed routing for new backend fixews to authenitication.
  - Added auto redirect for auth
  - Removed some old user table code
- Backend
  - Cleaned up old migrations and seeds
  - Updated masterFormMap to latest versions
  - Updated productions seeds to latest versions
  -

**July 19, 2023 [DESCW-1364](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1364)**

- Backend
  - added blank excel templates for each model
  - added tracking document to show blank vs complete templates for each model
  - removed extra model/controller for portfolioRollup (duplicates tab 35)
  - improved formatting on blank excel template

**July 18, 2023 [DESCW-1310](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1310)**

- Frontend
  - Updated admin subcontrator section with new table component
  - Updated admin ministries section with new table component

**July 17, 2023 [DESCW-1253](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1253)**

- Frontend
  - enable recover forecast report with fiscal parameter
  - populate tab 43 excel template with carbone language matching model properties
- Backend
  - add model for tab 43 report
  - update generic model template for greater convenience (using raw queries)

**July 17, 2023 [DESCW-1255](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1255)**

- Backend
  - adds generic excel template for reports
  - updates generic report model to be easier to use out-of-the-box
  - these changes should simplify development of new reports by automating some boring stuff

**July 14, 2023 [DESCW-869](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-869)**

- Frontend
  - Added enhancements to header and footer of the main page layout.
    - Title of the page will now show in the page header
    - The page footer is now sticky

**July 14, 2023 [DESCW-1255](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1255)**

- Frontend
  - Moved Finance Recovery Project Summary Forecast to the Divisional Project Financials category

**July 14, 2023 [DESCW-1224](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1224)**

- Backend
  - Added model for historical billing report
  - Added xls template for historical billing report
- Frontend
  - Enabled export xls option for historical billing report

**July 14, 2023 - [DESCW-871](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-871)**

- Frontend
  - Updated admin contact section with new table component
  - Updated admin supplier section with new table component

**July 13, 2023 - [DESCW-1354](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1354)**

- Backend
  - tests for routes using generic controller
  - adding logging and error handler for validation failures on routes.

**July 13, 2023 - [DESCW-1301](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1301)**

- Frontend
  - made form renderer more efficient
  - Resolved bug with duplicate calls
  - Updated all form configs to be more efficient and cohesive
  - Resolved all add new functionality bugs for contract and project sections

**July 12, 2023 - [DESCW-1247](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1247)**

- Frontend
  - build template and test against sample template for accuracy
  - enable excel report for tab 20
  - disable pdf report for tab 20 (template isn't written yet)
- Backend
  - build generic 'model template' for future tickets
  - adapt and refactor given query for use with knex
  - build model for tab 20 data: report, report_totals, fiscal_year
  - fix some minor linter warnings

**July 11, 2023**

- Frontend

  - fixed issue preventing project contacts from saving
  - made select fields more effeicent by combing single and multi choice select component

- Backend
  - Fixed quarter seed from string to number
  - required to run locally `npx knex seed:run --specific=08_picker_options.js`

**July 10, 2023 - [DESCW-1319](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1319) [DESCW-1297](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1297)**

- Frontend
  - small fix for axios call if 401 error.
- Backend
  - Fix tests, and refactor fastify.js
  - updated report routes to use preHandler
  - updated report routes to have PMO-Reports-Capability
  - refactor role management

## Developer Changelog**July 7, 2023 - [DESCW-1297](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1297)**

- Frontend
  - fixed issue preventing project billing from saving
  - fixed issue preventing project lesson learned from saving
  - fixed issue preventing contracts not rendering

**July 5, 2023 - [DESCW-1319](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1319) [DESCW-1297](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1297)**

- Frontend
  - fixed issue preventing project change request from saving
- Backend
  - removed report routes
  - update report models

**July 5, 2023 - [DESCW-1219](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1219)**

- Frontend
  - adjust styling on header, table, and footers
  - replace graphic in header
  - replace footer contents with current_date where applicable
  - switch to bc sans font
  - use report_date from modified controller (uses getCurrentDate())
- Backend
  - add report_date to controller output

**July 5, 2023 - [DESCW-585](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-585)**

- Frontend
  - fixed issue preventing client coding from saving
  - fixed issue preventing project budget from saving
  - fixed issue preventing project status from saving
  - added optional required prop to input fields on all forms

**July 5, 2023 - [DESCW-1315](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1315)**

- Backend
  - add basic validation to prevent db query without proper variables
  - updated general controller error logic.

**July 5, 2023 - [DESCW-1319](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1319)**

- Frontend
  - Update frontend report url to /report/${report_name}
- Backend
  - Create universal route for all controllers
  - Update all reports to use new url /report/${report_name}
  - Added general route validator.

**July 4, 2023 - [DESCW-1219](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1219)**

- Frontend
  - allow template type: "docx" to export

**July 4, 2023 - [DESCW-1222](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1222)**

- Backend
  - use a consistent getCurrentDate() function for all report controllers

**June 30, 2023 - [DESCW-1145](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1145)**

- Frontend
  - Added selectors for all divisional project financial reports.
  - Fixed functionality which allows you to add new project deliverable

**June 29, 2023 - [DESCW-1250](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1250)**

- Meta

  - Removed backend version bump workflow.
  - Added frontend version bump to trigger off of both backend and frontend changes.

- Frontend
  - Display npm package version on footer. This requires adding `REACT_APP_VERSION=$npm_package_version` to the frontend .env file.
  - Upgraded to React version 18.
  - Upgrades react-testing-library to version 14.
  - Removed enzyme (end-of-life).
  - Deprecated tests are sequestered to `frontend_tests_deprecated`.
  - Imports on those tests were updated for ease of in-place testing.

**June 28, 2023**

- Backend
- Frontend
  - Refactored report select.

**June 28, 2023 - [DESCW-1223](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1223)**

- Backend
  - Update app.yaml to include dockerfile contents.

**June 28, 2023 - [DESCW-1180](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1180)**

- Backend
  - Removed verifyUserExists and all references to it, as they refer to the unused user table.
  - Removed references to user table.
  - Removed user tests.
- Frontend
  - Removed user picker options.
  - Removed references to 'pmo-sys-admin'.

**June 23, 2023 - [DESCW-1043](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1043)**

- Frontend
  - update react-query by replacing it with @tanstack/react-query.
  - change first arg of useQuery() to an array per the changelog.
  - update all imports to @tanstack/...

**June 23, 2023 - [DESCW-1187](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1187)**

- Backend
  - Create generic controller.
  - Update report template script to use it.
  - Slight refactor of controller.
  - Update documentation in generic controller.
  - Add error-handling to generic controller.
  - Add error-handling to tab_50 model.

**June 14, 2023 - [DESCW-1212](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1212)**

- Backend
  - add validator for Tab 50 report
  - re-factored tab48 controller
  - re-factored tab50 controller
  - replaced query in tab 50 model with the one provided in the ticket
  - added description for tab 50 report
  - created tab 50 excel template
  - added fiscal year model to tab 50 model for consistency with tab48
- Frontend
  - fixed import error for .../Deliverables/index.tsx Line 2 (incorrect case on filename)
  - added Tab 50 report
  - re-ordered reports by tab number to place tab 50 below tab 48 report
  - updated styling on tab 50 report template for both excel and pdf exports

**June 13, 2023**

- Backend
  - Added Backend for handling new project
- Frontend
  - Added functionality to handle new project creation in frontend interface for project section

**June 12, 2023**

- Frontend
  - Added new form functionality to Modal Table component

**June 07, 2023 [DESCW-1133](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1133)**

- Backend
  - upgrade openShift postgresql to v15.3-bullseye
  - upgrade local postgresql to v15.3-alpine
  - locally pull image and re-seed db
  - refactor getReportAndSetRequestHeaders() for clarity
- NOTE: developers will need to delete their postgresql volume and re-run seed/migrations
  - docker `docker volume rm gdx-agreements-tracker_database` (or use the gui to delete your gdx database image) + re-seed + re-create gat-db database in pgAdmin.

**June 07, 2023**

- Backend
  - refine one-line logging for production mode

**June 06, 2023**

- Backend
  - enable one-line logging for production mode

**June 05, 2023**
-Backend

- update script to generate template controller that can export xlsx files

**June 02, 2023**

- Meta
  - Added ability to run version increment workflow manually (DESCW-1140)
- Backend
  - Reset version to 0.1.0
- Frontend
  - Reset version to 0.1.0

**June 01, 2023**

- Meta

  - Added workflows to automatically update app and api version when changes are pushed to development branch (DESCW-1140)
    - Automatically increments minor version by 1: eg. 1.0.0 -> 1.1.0

- Backend
  - enabled .xlsx export
  - refactored some utility functions in helpers/index.js
  - minor typo fixes
  - formatting changes
  - add some error checking for inputs and filetypes
- Frontend
  - enabled .xlsx export (adds button and disables it for reports with no xls template)
  - added some checks to ensure proper options are passed to cdogs api
  - minor typo fixes
  - formatting changes

**June 01, 2023**

- Frontend

  - Added checkmark renderer for table component
  - Added health indicator renderer for table component

- Removed fastify-markdown plugin (DESCW-1132)
- Backend
  - Replaced glossary markdown with html (DESCW-1132)

**May 31, 2023**

- Frontend

  - Added db_lock to contract deliverables section
  - Added db_lock to contract gdx-internal-coding section
  - Added db_lock to contract Amendments section

**May 30, 2023**

- Backend
  - Updated GDX Project Net Recoveries model to use portfolio option
  - Added subtotals by portfolio
  - Clean up model code for readability / reusability
- Frontend
  - Added picker for portfolio option

**May 29, 2023**

- Backend
  - Updated model to show totals & subtotals
  - Updated controller to show totals & subtotals
- Frontend
  - Add tab 48 template
  - Added db_lock to contract invoice processing sections
    - Invoice Resources
    - Invocie Deliverables
  - Added db_lock to contract resources section

**May 25, 2023**

- Backend

  - Added model for GDX Project Net Recoveries report
  - Added controller for GDX Project Net Recoveries report

- Frontend
  - Added options for GDX Project Net Recoveries report

**May 24, 2023**

- Frontend

  - Added db_lock to contracts section
  - Added db_lock to contract details section

**May 24, 2023**

- Frontend

  - Added db_lock to project close out section.
  - Fixed render bugs and styling for table component
  - Updated how react query for the frontend works with form and table data

**May 23, 2023**

- Backend
  - remove unnecessary fastify developer conditional to remove extra requests

**May 23, 2023**

- Frontend

  - Added db_lock to project lessons learned section.

**May 19, 2023**

- Backend
  - contract summary report [DESCW-1106](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1106)

**May 18, 2023**

- Frontend

  - Added db_lock to project budget section.
  - Added db_lock to project billing section.

- Backend

  - Updated Date validator to accept data without time.

**May 17, 2023 [DESCW-1122](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1122) (DESCW-1148)**

- Frontend

  - add report option for finance recover project summary forecast
  - add description text for that option
  - add required input 'fiscal' for the report
  - Added db_lock to project client coding
  - Added db_lock to project budget section
  - Added db_lock to project status section
  - updated report pointer for Contract summary

- Backend
  - Re-factored Individual contract reports > Contract summary
  - Added new backend script `npm run createReport` which creates all the required framework for reports.
  - Created Tab_10 report as a test

**May 16, 2023**

- Backend
  - add fiscal year to totals model
  - slightly refactor model/controller
- Frontend
  - fix typo in frontend component import
  - finish template for net recovery summary by quarter

**May 15, 2023**

- Backend
  - add model for net recovery summary by quarterly reports
  - add controller
  - add totals model as well for same report

**May 15, 2023**

- Frontend
  - fixed issue with projects table not rendering

**May 15, 2023**

- Frontend
  - Upgraded to react-router v6.11

**May 12, 2023 (DESCW-1102)**

- Backend

  - Updated model, validators for deliverables

- Frontend
  - Updated new Table component to be more reusable
  - Add hook useFormatTableData for formatting table data
  - Updated new Table with modal to be more reusable
  - Removed unused code
  - Updated deliverables section to use new tablewithmodal

**May 11, 2023 (DEWCW-1130)**

- bumped postgres version
- Fixed s2i build to use omit=dev
- Backend
  - removed n-readlines from devDevelopment (Backend)
  - removed sensitive information in logging

**May 10, 2023 (DESCW-1073)**

- Backend
  - enable pdf output
  - adjust model somewhat
  - structure model JSON to group rows by project_number
- Frontend
  - finish template
  - make fiscal year a required parameter
  - add try/catch block to alert users of cdogs timeout
  - remove change request reports from report list (DESCW-1076)

**May 8, 2023**

- Backend
  - Add model, controller, and route for multi-year changerequest summary report.

**May 5, 2023**

- Frontend
  - Upgraded to mui-x version 6
    **May 5, 2023 (DESCW-1128)**
- OpenShift
  - Created Kustomized deployments of ImageStreams and BuildConfigs
  - Updated node s2i for api, which now includes auto migrations and seeds (no longer require manual commands by devs)

**May 5, 2023 (DESCW-1129)**

- Backend
  - Updated packages dependencies
    **May 4, 2023 (DESCW-1128)**
    Upgrade node docker builds to 18.14

**May 4, 2023 (DESCW-1105)**

- Backend
  - restored docx reports for Individual Projects
    - project status (most recent) Tab_17
    - project budget Tab_14
    - project quarterly Tab_16
    - Project quarterly billing request Tab_15
  - refactored models for; Tab_14 - Tab_16
  - Added model/useDbTables - to store the table name and schema
  - Added model/report/useProject - to store common used functions.
- Frontend
  - fix typescript error

**May 3, 2023 fixed issue with duplicate clicks for dblocking mechanism**
| Backend |
| -------- |
fixed issue with duplicate clicks for dblocking mechanism

**May 3, 2023 db_lock migratino update**
| Backend |
| -------- |

- Added update migration update for db_lock table.
- Added debug for github actions

**May 3, 2023 (DESCW-1098)**

- Backend
  - updated report controllers for Individual Projects
- Frontend
  - updated route settings for Individual Projects

**May2, 2023 Added DbLock to more sections**
**May 2, 2023 (DESCW-1097)**

- Backend
  - updated Tab_18 controller and model
  - created a project.js model for common project model queries
- Frontend
  - Updated pointer of Individual Project Reports > Status Summary to point to Tab_18

**April 29, 2023 SQL injection prevention patch**
| Backend || Frontend |
| -------- |

- Added dblock to project contacts section.
- Added dblock to project agreements section.

**April 29, 2023 SQL injection prevention patch**
| Backend |
| -------- |

- updated model for db_lock to use knex instead of raw to help prevent SQL injection.

**April 28, 2023 (DESCW-1041) DB Locking Refactor Final**
| Frontend |
| -------- |

- Form render is now more simplified. Now instead of showing a lock when the section is locked, it shows a read form. The way to determine if the section is locked is to click the edit button which will query for lock information.
- updated useRenderTableCell to follow React best practices.
- Updated project page to use table component from tablewithmodal as it doesn't need a modal
- Temp. disabled table with modal functionality.
- Added new hook for handling form data. (useFormData)
- Made useFormLock for simplified and updated type definitions.
- removed unnecessary async from useFormSubmit
- changed "fields" config files to be called "formFields"
- updated project details section to handle more functionality for efficiency elsewhere.

| Backend |
| ------- |

- Made db_lock controller more efficient. Now it handles everything from checking lock, lock owner and adding locks all in one function.
- Removed fastifyRowLockCheck and changed it to send back the payload now only. It is now called fastifyPayload.
- Cleaned up the db_lock model to be more efficient and easier to read.
- Changed all db_lock routes to be posts to allow for passing parameters. Although all routes use the POST method, the model of those routes add, remove, and get respectively.
- Removed old db_lock validation from common validation schema
- Updated projects validator to check for correct data and allow for null values where necessary.

---

**April 21, 2023 (DESCW-1041) DB Locking Mech pt.4**
| Frontend |
| -------- |

- Temporarily removed lint check for unused variables.
- Added a temporary dummy test to allow tests to pass in github while we rework old tests.
- Added FormRenderer component to allow for easier implementation of dblock
- Broke out the notification snackbar into it's own component reusablilty
- Broke out form buttons into their own component to allow for more reusablilty
- Create new Input form which will eventually replace edit and create for component
- useDBLockRender will go away soon so I removed the handleform type function
- Updated use form submit to be more efficient. I also had to add some temporary measures to allow for no errors. These will be resolved in the next PR
- Added useSnackbar hook to alllow for the snackbar functionality to be broken out and reused.
- Added a ternary to the project details section that added a loader if there is no data yet
- Added new reusable dblock and form functionality to the project registration section
- Added more type definitions to types.d.ts

---

**April 19, 2023 (DESCW-1041) DB Locking Mech pt.3**
| Frontend |
| -------- |

- Added reusbale DB Lock functionality
- Applied reusbale DB Lock functionality to section "Projects/Project/ProjectRegistrationSection"

---

**April 18, 2023 (DESCW-1041) DB Locking Mech pt.2**
| Frontend |
| -------- |

- Starting restructure of frontend tables to help with readabliltiy and performance.
- Temp disabled frontend tests because of restructure.

---

**April 12, 2023 (DESCW-1008) Made backend more efficient for role handling**
| Backend |
| -------- |

- Removed Fastify plugin "fasify roles"

---

**April 6, 2023 (DESCW-1008) Added keycloak roles and capabilities to controller hook**
| Backend |
| -------- |

- Updated controllers to use new userRquires function
- Added keycloak roles and capabilities to useController hook
- Updated frontend to use keycloak roles and capabilities

---

**April 5, 2023 (DESCW-1008) fix logon bug**
| Frontend |
| -------- |

- Changed the frontend Authorized routes to use keycloak roles over the postgresql

---

**MAR 31, 2023 (DESCW-405) DB Locking Mechanism**
| IMPORTANT! |
| --- |

- Make sure to run seeds: 01_capabilities and 02_role_capabilities.

  - `npx knex seed:run –specific “01_capabilities.js`
  - `npx knex seed:run –specific “02_role_capabilities.js`

- Make sure to run migration latest:
  - `npx knex migrate:latest`

| Backend |
| ------- |

- Added database locking mechanism(db_lock) - Added controller, routes, and models for db_lock
  - Added new capabilities for admins.
    - db_lock_add_one
    - db_lock_read_all
    - db_lock_delete_one
  - Updated error message handling for failed Query function in useController hook
  - Added new Fastify plugin for checking role check on a section: fastifyRowLockCheck
  - Updated common_schema validator to include new property “db_row_lock”

| Frontend |
| -------- |

- Added new reusable button for running db locking functions, taking over lock function, - and putting form in edit mode.
- Updated hook index to include new and old hooks for import efficiency.
- Added new lock for handling form section locking(db_lock) called “useFormLock”
  - Updated project registration section to use new form locking(db_lock) mechanism.
- Added a more in-depth switch handler for rendering the project registration section (will need to be made more efficient in future tickets)

---

### MAR 20, 2023 (DESCW-964) PA Fiscal Template and Query

- Backend
  - Created route, controller, and model for pa by fiscal
- Frontend
  - Added Project Registered Reports by fiscal and report template (initial template)

### MAR 16, 2023 (DESCW-966) PA ministry template

- Backend
  - finalized the template

### MAR 15, 2023 (DESCW-967) PA ministry queries

- Backend
  - Created route, controller, and model for pa by ministry
- Frontend
  - Added Project Registered Reports functionality and report template (initial template)

### MAR 15, 2023 (DESCW-1002) add migration

- Backend
  - Created migration for new project by ministry view

### MAR 13, 2023 (DESCW-970) Project registered by date/year

- Backend
  - Created route, controller, and model for Project registered by date/year
- Frontend
  - Added Project Registered Reports functionality and report template.

### MAR 1, 2023 (DESCW-838) Project dashboard by Portfolio

- Backend
  - Created route, controller, and model for Divisional Projects
- Frontend
  - Added Project Dashboard Reports functionality and report template.

### Mar 1, 2023 (DESCW-697) Add search to tables

- Frontend
  - Added Search function to table component

### Feb 28, 2023 (DESCW-930) Divisional Project Reports

- Backend
  - Created route, controller, and model for Divisional Projects
- Frontend
  - Added Divisional Projects Reports functionality and report template.

### Feb 21, 2023 (DESCW-833) Update Secrets fro CDOGS and CHES

- Backend
  - Updated secrets for ches and cdogs to most recent version
  - Updated code to account for unique secrets and id's for cdogs and ches

### Feb 17, 2023 (DESCW-692) active-projects-by-portfolio

- Backend
  - Added template and updated it
  - Fixed DESCW-839 template which had unused carbone template statement
  - updated model to pull needed totals
  - updated controller to shape model output for templating engine
  - installed lodash in backend
  - Updated node version to "=18.14.1"
- Frontend
  - Updated node version to "=18.14.1"
- GITHUB TESTS
  - Updated from 16.x/gallium to 18.x

### Feb 7, 2023 (DESCW-839) portfolio-status-rollup report query

- Backend
  - Added all blank templates for reports (xlxs, docx)
  - Added boilerplate controllers, models, routes for reports

### Feb 7, 2023 (DESCW-839) portfolio-status-rollup report query

- Backend
  - Updated route, controller, and model for project rollup report
  - separated utility functions into helper folder

### February 3, 2022 Helper functions for reports

- Backend
  - added loadTemplate, groupByProperty and getDocumentApiBody helpers

### December 16, 2022 (DESCW-686) Project deliverables section

- Backend

  - updated picker options
  - `npx knex seed:run --specific=08_picker_options.js`
  - updated picker options model.
  - Added project deliverables backend

- Frontend
  - Added project deliverable section

### December 6, 2022 (DESCW-733) Project budget section

- Backend
  - updated picker options
  - `npx knex seed:run --specific=08_picker_options.js`
  - updated picker options model.
- Frontend
  - Added project budget section

### December 6, 2022 (DESCW-689) Contract GDX Internal Coding

- Backend
  - Created controller, model, route, validators for Contract Internal Coding
- Frontend
  - Created Internal Coding page component and fields file
  - Fixed console errors due to incorrect usage of Grid component in GDXList

### December 6, 2022 (DESCW-733) Project Status Rollup Report

- Backend
  - Created route, controller, and model for project rollup report
- Frontend
  - Added Active Projects rollup to the list of json reports.

### December 6, 2022 (DESCW-690) Individual Contract Summary Report

- Backend
  - Created route, controller, and model for contract summary report
- Frontend
  - Added Active Projects Report to the list of json reports.
  - Small bug fix for a problem with accessing values inside parameter objects

### December 2, 2022 (DESCW-730) Project Lessons Learned Report

- Backend
  - Created route, controller, and model for Project Lessons Learned Report
  - Fixed bug in Project Dashboard report
  - Changed Report Controller groupByPortfolio() to generic groupByProperty()
- Frontend
  - Changed ReportSelect Component:
    - Handles required/optional fields
    - Handles route params vs. querystring params
    - Fixed hardcoded localhost url, now using UseAxios hook

### December 1, 2022 (DESCW-691) Divisional Active Projects Report

- Backend
  - Created route, controller, and model for Divisional Active Projects Report
- Frontend
  - Added Active Projects Report to the list of json reports.

### December 1, 2022 (DESCW-732) Project Dashboard Report

- Backend
  - Created route, controller function, and model function for Project Status Dashboard report
- Frontend
  - Changed ReportSelect component to temporarily allow downloading reports as json.
  - Fixed bug with multiselect input initial value.

### November 25, 2022 (DESCW-708) Projects Backend Reorg

- Backend
  - Reorganized backend for projects (Run npm i to install new dependencies)
  - Reorganized backend for reports
  - Reorganized backend for amendments
  - Reorganized backend for change_requests
  - Reorganized backend for client_coding

### November 22, 2022 (DESCW-726) Quarterly Review Report

- Backend
  - Added controller function, model functions, routes for Project Quarterly Review Report

### November 22, 2022 (DESCW-663) Project Status Section

- Frontend Backend
  - Added project Status Section

### November 22, 2022 (DESCW-658) Edit Cancel Button

- Frontend
  - Added cancel button to EditForms so user can return to ReadForm without page refresh

### November 18, 2022 (DESCW-725) Budget Summary Report

- Backend
  - Added controller, model and routes for Budget Summary Report
  - Changed report routes to use a common handler: getReport
  - Changed project status most recent and budget summary report to match new standard

### November 18, 2022 (DESCW-29) Contracts List Filters

- Frontend
  - Added initial filter state contracts list
  - Fixed bug in GDXModal causing close button not to close modal

### November 16, 2022 (DESCW-727) Project Quarterly Billing Request Report

- Backend
  - Added controller function, model functions, routes for Project Quarterly Billing Request Report

### November 10, 2022 (DESCW-720) Project Status Summary Report

- Backend
  - Added controller function, model functions, routes for Project Status Summary Report

### November 7, 2022 (DESCW-40) Projects List Filter

- Frontend
  - Committed package-lock file!
    - If frontend unit tests are failing you may need to run `npm ci`
  - Re-enabled table filtering and sorting
  - Added initialState prop to Table component to allow setting default filter values (projects status filter defaults to "active")

### November 2, 2022 (DESCW-633) Project Status Report

- Backend
  - Updated report routes
  - Created Template and updated the cdogs API query for Project Status (Most Recent)
  - Updated capabilities.
  - `npx knex seed:run --specific=01_capabilities.js`
  - Updated picker options
  - `npx knex seed:run --specific=08_picker_options.js`
- Frontend
  - Added ability to export Project Status Report (Most Recent) as a pdf on the report page

### November 2, 2022 (DESCW-623) Project Contacts Section

- Backend
  - Created migration to add unique constraint to contact_project table
    - `npx knex migrate:latest`
  - Created controller, model, routes, and validators for project contacts
- Frontend
  - Created/implemented ProjectDetails/ContactSection page
  - Changed Select and Multiselect components to optionally use a fieldLabel given in editFields

### October 27, 2022 (DESCW-631) Added tests for frontend components

- Frontend
  - Added tests for TableComplete and all associated components

### October 25, 2022 (DESCW-617) Lint Cleanup

- Frontend
  - Fixed various lint warnings across frontend (mainly use of `any` type).

### October 21, 2022 (DESCW-662) Projects Client Coding Delete

- Frontend
  - Created DeleteButton and ConfirmationDialog components.
  - Added above components to FormHeader used in TableComplete modal.

### October 21, 2022 (DESCW-662) Projects Client Coding Section

- Backend
  - Added controller, model, routes, and validators for client coding.
- Frontend
  - Created ClientCoding page component and fields.
  - Fixed bug with GDXAccordion not allowing TableComplete as child.
  - Added button, capability checking, and request handling for delete requests to TableComplete and associated components.

### October 19, 2022 (DESCW-654) Invoice Resources/Deliverables

- Backend
  - Updated picker options seeds:
    - `npx knex seed:run --specific=08_picker_options.js`
  - Added controller, model, route, and validators for invoice_resources and invoice_deliverables.
  - Fixed bugs with picker_options model.
- Frontend
  - Added support for contract-specific picker options.
  - Added read/edit/add for invoice resources and invoice deliverables.

### October 18, 2022 (DESCW-625) Contract Deliverables Section

- Frontend

  - Added Deliverables page component
  - Added new BudgetDisplay component

- Backend
  - Added controller, model, route, validator for Deliverables

### October 17, 2022 (DESCW-638) Picker options update

- Backend
  - update picker options
  - `npx knex seed:run --specific=08_picker_options.js`
  - allowed for project id / contract id
- Frontend
  - client coding in billing now uses new picker options

### October 13, 2022 (DESCW-638) Picker options update

- Backend
  - updated picker options
  - `npx knex seed:run --specific=08_picker_options.js`
  - updated picker options model.
- Frontend
  - updated edit and new table to include pickerName attribute.

### October 12, 2022 (DESCW-659) Contract - Amendments table

- Backend
  - updated amendments validators and model
- Frontend
  - updated amendments component.

### October 12, 2022 (DESCW-660) Change Request table

- Backend
  - Updated capabilities.
    - `npx knex seed:run --specific=01_capabilities.js`
    - `npx knex seed:run --specific=02_role_capabilities.js`
  - project controller/model
  - permission issues
- updated change request table list.

### October 11, 2022 (DESCW-611) Fastify Upgrade

- Backend
  - Upgraded Fastify and related packages to latest versions.
    - `npm i` from /backend directory
  - Updated all validators (serializer now required to run in strict mode).
- Frontend
  - Changed amendments page to use TableComplete component.

### October 6, 2022 (DESCW-657)

- fixed login loading issues
- converted change request to tableComplete
- updated Table defaults
- Removed Admin test, which was testing only for Admin title.

### October 6, 2022 (DESCW-656) Table Lists

- Backend
  - updated models for getAll, and validators to improve Table lists
  - updated roles
    - `npx knex seed:run --specific=02_role_capabilities.js`
  - Frontend
    - Added columnWidths property to allow tables to have different flex sizes besides 1
    - updated Projects and Contract lists.
    - updated amdin form lists.

### October 6, 2022 (DESCW-624) Contract Resources Roles

- Backend
  - Created migration to drop user_roles table and removed all references to it in code (03_users_roles seed, users model, facilities/keycloak).
    - `npx knex migrate:latest`
- Frontend
  - Updated routes to allow Manager role to access routes (only allowed Administrator before).

### October 5, 2022 (DESCW-624) Contract Resources

- Backend
  - Created contract resources controller, model, routes, validators.
  - Added getAll/getOne/update/add functionality to above.
  - Change to picker options:
    - `npx knex seed:run --specific=08_picker_options.js`
- Frontend
  - Added Contracts/Resources page component.
  - Created TableTotalFooter to allow tables to display column totals in footer.

### October 4, 2022 (DESCW-625) Contract Deliverables

- Frontend
  - added new component for rendering table-like data

### October 3, 2022 (DESCW-627) Update admin forms to use new component TableData

- Frontend
  - Updated admin forms to use new component TableComplete (formally TableData)

### September 28, 2022 (DESCW-653) Contracts Add/Update

- Backend
  - Created invoice details controller, model, routes, validators.
  - Added add/update functionality for invoices controller, model, routes, validators.
  - Change to picker options:
    - `npx knex seed:run --specific=08_picker_options.js`
- Frontend
  - Created InvoiceProcessing/Deliverables and /Resources page components.
  - Added read/edit form fields for invoices, deliverables, resources components.
  - Added logic for changing which deliverables/resources are displayed based on invoice table row selected.

### September 23, 2022 (DESCW-616) Contracts Add/Update

- Backend
  - Added add/update functionality to Contracts route, validator, model.
  - Created models/useModel to provide reusable model functions (diffInsert() for now).
  - Small change to picker options:
    - `npx knex seed:run --specific=08_picker_options.js`
- Frontend
  - Refactored Contracts pages (separated Contract Details from Invoice Processing).
  - Created reusable ReadEditPage component to be used for single-item read/edit form pages (Contract Details, Project Registration for example).

### September 23, 2022 (DESCW-614) Billing

- Frontend
  - updating TableData component for updates, has new prop for url's
  - fixed not authorized when browser refresh
  - finishing up Project Billing section

### September 23, 2022 (DESCW-483) Lessons Learned Table

- Backend
  - Created routes, controllers, models, validators for Lessons Learned
  - Added picker options for Lessons Learned
    - `npx knex seed:run --specific=08_picker_options.js`
- Frontend
  - Created Lessons Learned Section Page Component
  - Added routing for above

### September 21, 2022 (DESCW-615) Contracts Frontend

- Backend
  - Created routes, controllers, models, validators for Contract and Contract Invoices (only GETs)
  - Added picker options for Contract form
    - `npx knex seed:run --specific=08_picker_options.js`
- Frontend
  - Created ContractDetailsSection and InvoiceSection page components
  - Added routing for above
  - Created GDXMultiselect reusable field component (allows multiple values to be selected in select input)
  - Added support for "readonly" form inputs shown in some mockups

### September 21, 2022 ([DESCW-590](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-590))

- Bump knex version to 2.0.3
- Backend
  - Update role capabilities and users roles seeds to reflect that operations now always return an object: [Upgrading knex to version 1.0.0](https://github.com/knex/knex/blob/master/UPGRADING.md#upgrading-to-version-100)

### September 20, 2022 (DESCW-613) (DESCW-586) CDOGS CHES

- Backend
  - CDOGS and CHES functionality
  - Files added:
    - backend/src/controllers/useCommonComponents/index.js
    - backend/src/controllers/cdogs.js
    - backend/src/controllers/ches.js
    - backend/src/routes/ches.js
    - backend/src/routes/cdogs.js
- Frontend
  - Fix model edit button not showing up, with convert to new TableData component

### September 16, 2022 (DESCW-566) Role Base Routing

- Backend
  - Added Api to get current user
- Frontend
  - Added role base routing
  - Add API error handling

### September 15, 2022 (DESCW-568)(DESCW-574) Glossary

- Backend
  - Added fastify-markdown plugin to package.json
    - `npm i`
  - Created glossary route, controller, validator
  - Created glossary markdown file
- Frontend
  - Created Glossary page component and routing
  - Adding role check
  - Updating TableData

### September 14, 2022 (DESCW-574)

- Backend
  - initial journal voucher controller/model/route/validator
  - optimized picklist option code
  - removed view formatted_picker_options and replaced model with select statement
    - `npx knex migrate:latest`
  - updated pickerlist options seed
    - `npx knex seed:run --specific=08_picker_options.js`
- frontend
  - voucher table.
  - Created a reusable component for TableData

### Septermber 13, 2022 (DESCW-565) Backend capabilities

- Backend
  - Added pino prettier `npm i` to install which adds some formatted backend output logs
  - update capabilities seeds
    - `npx knex seed:run --specific=01_capabilities.js`
    - `npx knex seed:run --specific=02_role_capabilities.js`
  - Updated controller permissions

### September 13, 2022 (DESCW-567) Backend Route Tests Complete

- Backend
  - Added unit tests for all remaining routes

### September 9, 2022 (DESCW-567) Backend Route Tests

- Backend
  - Created common route testing suite for all route unit tests to use
  - Updated users route tests

### September 9, 2022 (DESCW-564) Controller Optimization

- Backend
  - Updated Database connection file to be more efficient
  - Updated all models to use new database connection functionality

### September 8, 2022 (DESCW-563) Route Validators

- Backend
  - Added input validation and response serialization for all other routes

### September 7, 2022 (DESCW-563) Route Validators

- Backend
  - Added fluent-json-schema dependency to package.json (need to `run npm install`)
  - Created validators/common_schema to provide helpers for validators
  - Added input validation and response serialization for change_request, projects, contacts, users routes

### August 31, 2022 (DESCW-587) Project Agreements

- Backend
  - Added input validation for agreements fields
- Frontend
  - Added missing agreements fields for read/edit forms
  - Moved logic for determining user capability into details component, now passed into children

### August 31, 2022 (DESCW-572) Project Close Out Notify

- Backend
  - Added controller and route for project close out notify function
- Frontend
  - Changed Notify component to handle checkbox value changes and make API request

### August 31, 2022 (DESCW-484) Project Reports

- Backend
  - Added controllers, models, and routes for project report queries

### August 30, 2022 (DESCW-561) Project CloseOut ChipNav

- Frontend
  - Updated ChipNav component to allow justifying chips right

### August 29, 2022 (DESCW-571) Project Registration

- Backend
  - Added `fiscal` picker option
  - Updated Projects controller getOne() to return contracts associated with project
- Frontend
  - Updated Project Registration page to use ReadForm and EditForm components, view/edit now working
  - Updated Project Agreements page to use ReadForm and EditForm components
- Require to run picker seeds
  - `npx knex seed:run --specific=08_picker_options.js`

### August 25, 2022 (DESCW-562) Project Close Out

- Backend
  - Created migration for contacts picker, seeds for multiple pickers
  - Refactored Projects controller to use admin_form functions
  - Add Projects route/controller/model functions for getting close out data
- Frontend
  - Fixed bug in hooks/useFormSubmit preventing form submit when given a null select field value
  - Added user capability check in Close Out page (determines whether user can edit)
- Require to run migrations and seeds
  - `npx knex migrate:latest`
  - `npx knex seed:run --specific=08_picker_options.js`

### August 25, 2022 (DESCW-537) accordion test

- Frontend
  - added according test.

### August 25, 2022 (DESCW-556) capabilities

- Backend
  - updated roles and cababilities
  - need to run seeds
    - `npx knex seed:run --specific=01_capabilities.js`
    - `npx knex seed:run --specific=02_role_capabilities.js`
  - updated plugin hook for checking permissions
  - updated users validators
  - fix for null user role_id

### August,24 2022 (DESCW-560)

- Frontend
  - Restructured and improved ministries and subcontractors page
  - Added test for ministries page component
- Backend
  - Added roles for viewing, editing and adding ministries.
  - Added tests for subcontractors
  - Added tests for minsitries

### August,24 2022 (DESCW-559)

- Frontend

  - Added test for amendments page component
  - Added amendments page component
  - Added amendments view, edit and add modal forms

- Backend
  - Added controller, model, route, validator for amendments
  - Added two capabilities "amendments_read_all",
    "amendments_read_mine",
  - Added amendments READ, POST and PUT functionality

### August 24, 2022 (DESCW-558) Project Close Out Frontend

- Frontend
  - Created Project/CloseOut and Project/CloseOut/Notify components
  - Added routing and navigation

### August 24, 2022 (DESCW-556) Permissions

- Backend
  - update realm capabilities logic.
  - removed unused capability helper (uses db)
  - optimize some controller code controllers/admin_form.js for controllers/user.js

### August 23, 2022 (DESCW-555) User Form

- Frontend
  - Added view, edit and create forms for User
- Backend
  - Update model and controllers for user
  - Created migration to add role_id in users table
  - Created migration to add user_roles in picklist_options
  - Seeded picklist.
- require to run migrations and seeds
  - `npx knex migrate:latest`
  - `npx knex seed:run --specific=08_picker_options.js`

### August 23, 2022 (DESCW-554) Ministries Form

- Frontend
  - Added view, edit and create forms for ministries.
  - Added new reusable form input type for checkboxes.
- Backend
  - Added MVC and routes for ministries.

### August 23, 2022 (DESCW-548) Contacts Form

- Frontend
  - Admin/Contacts: Fixed bugs with ministry select input
  - Added IOption interface to Types for use with Select input options ({value, label} objects)
- Backend
  - Improved Contacts model to handle ministry data
  - Added input validation to Contacts update/add requests

### August 23, 2022 (DESCW-553) Resources Test

- Frontend
  - simple resource test to test component
- Backend
  - permission test for correct/incorrect roles.

### August 22, 2022 (DESCW-549) Github actions

- Frontend
  - Added form for creating a new subcontractor.
- Backend
  - Added MVC and routes for adding a new subcontractor.
  - Added 'subcontractors_read_mine' test.

### August 22, 2022 (DESCW-553) Github actions

- Fixed github actions with linters/tests being skipped

### August 22, 2022 (DESCW-543) Resource Form

- Frontend
  - Admin - Resources (view, edit, and add)
- Backend
  - models, controllers and routes to support admin resources.
  - Migrations need to be run
  - `npx knex migrate:latest`
  - seeds need to be re run
    - `npx knex seed:run --specific=01_capabilities.js`
    - `npx knex seed:run --specific=02_role_capabilities.js`

### August 22, 2022 (DESCW-550)(DESCW-541)

- Frontend

  - Added view, edit and update forms and functionality for suppliers
  - Fixed bug with modal headers not being correct
  - Fixed snackbar message not showing correctly

- Backend
  - Changed Node version requirement from 16.16 to 16.x
  - Added controller, model, route, validator for supplier
  - Added three new capabilities to seeds, "suppliers_update_all", "suppliers_read_all", "suppliers_update_mine",

### August 19, 2022 (DESCW-547)

- Frontend
  - Improved subcontractor view and edit forms.
  - Removed ability to view and edit subcontractor id.
- Backend
  - Added subcontractors MVC and ability to edit in modal.
  - Made adding roles more efficient.

### August 18, 2022 (DESCW-539)

- Frontend
  - Contacts view/edit modal
- Backend
  - Added controller, model, and routes getOne(), updateOne(), addOne() for Contacts

### August 18, 2022 (DESCW-457)

- Frontend
  - Subcontractors view modal

### August 17, 2022 (DESCW-457)

- Frontend
  - Added Reports navigation and report selector

### August 17, 2020 (DESCW-538)

- Frontend
  - Resources view modal
- Backend

  - Added controller, model, route, validator for project status summary

  - Requires
    - `npx knex --specific=01_capabilities.js seed:run`
    - `npx knex --specific=02_role_capabilities.js seed:run`
  - Updated Resources (controller, model)
  - Added controller, model, route, validator for project status summary

### August 16, 2022 (DESCW-505)

- Frontend
- Added test for GDX Accordion

### August 12, 2022 (DESCW-67)(DESCW-536)

- Frontend
- Added react router for contracts
- Added link for contracts to sidebar menu and connected it to react router
- Added contracts page with
- connected contracts MUI table to contracts API to use real data
- Resolved old linter warnings
- Add Modal functionality to Suppliers page

- Backend
  - Added controller, model, route, validator for contracts
  - Added new capabilities "contracts_read_mine", "contracts_read_all"

### August 8, 2022 (DESCW-420)

- Frontend
- Created new reusable component called "CreatForm"
- Fixed layout issues on all forms
- Added new Form Type state which allows for switching between edit and new forms types
- Added test for CreateForm component
- Fixed any type errors for in-scope components
- Added new "Post" and "Edit" functions to useFormSubmit hook
- Added n-readlines as prod dependency

- Backend
  - Added "addOne" function - used for posting a new Change Request(CR)
  - Added new capability "change_request_add_one"

### July 28, 2022 (DESCW-419)

- Frontend

  - Created reusable edit form component
  - Updated variables in reusable components to be more readable
  - Added check role exists hook
  - Added check role condition for cr form edit button
  - Created reusable read form
  - Created useFormSubmit hook for handling form submissions
  - Added more type definitions to types.d.ts

- Backend
  - Added change-request(cr) update function to controller
  - Updated variables to be more clear for projects controller
  - Added two capabilities "change_request_update_one" and "change_request_update_all"
  - Added new "generic" grouping for picker options
  - Added filters to cr model
  - Added cr id in response for cr validator

### July 12, 2022 (DESCW-484)

- Backend
  - Added controller, model, route, validator for project status report
  - Added a new capability to seeds: "report_read_mine"

### July 6, 2022 (DESCW-455)

- Backend
  - add development api bypass

### July 5, 2022 (DESCW-417)

- Frontend
  - Added ChipNav component for forms
  - GDXSelect uses MUI Skeleton as a placeholder instead of a loader
  - Made useFormatTableData hook more reusable
  - Added change request table section for each project
  - Reorganized project file directory
  - Converted conditional rendering to use switch statements
- Backend
  - Changed Node version requirement from 16.15 to 16.15.1
  - Added controller, model, route, validator for change requests
  - Added two new capabilities to seeds, "change_request_read_all" "change_request_read_mine"
  - Updated react-router-dom from 6.2.1 to 6.3

### June 29, 2022 (DESCW-449)

- Openshift
  - updated nginx deploy to handle keycloak variables for app
- Frontend
  - updated keycloak to use variables, instead of hardcoded
  - updated ReactKeycloakProvider to have initial options.

### June 28, 2022 (DESCW-409)

- Openshift
  - add whitelist annotation to app dev route

### June 28, 2022 (DESCW-448)

- Update local dev for backend.

### June 28, 2022 (DESCW-444)

- update nginx docker file to specific version of nginx
- update api config to point to new postgres service

### June 28, 2022 DESCW-416

- Frontend
  - Added Agreements sections to project form

### June 27, 2022

- Frontend, Backend
  - Added functionality for updating project registration data in projects DB

### June 23, 2022 DESCW-444

- OpenShift
  - restructured OpenShift images and BuildConfigs
  - Update README's
- Github actions
  - minor naming changes, and re-point to new builds.

### June 23, 2022

- Frontend
  - Added https cert creation and enforcement

### June 20, 2022 DESCW-402 DESCW-403

- Frontend
  - added project registration structure

### June 16, 2022 DESCW-392

- frontend
  - move dockerfile to openshift/templates/app folder
  - added inline dockerfile to build
- backend
  - move dockerfile to openshift/templates/api folder
  - added inline dockerfile to build

### June 15, 2022 DESCW-394

- Frontend / backend
  - added Node version restriction rules

### June 14, 2022 DESCW-410

- Frontend
  - added accordion for project sections

### June 3, 2022 DESCW-402 DESCW-403

- Frontend
  - added project registration structure

### June 20, 2022 DESCW-402 DESCW-403

- Frontend
  - added project registration structure

### June 3, 2022 DESCW-402 DESCW-403

- backend
  - new migration and seeds for ministries and layout tables
  - new api for ministries and layout tables
  - added filter for default project table data
- Frontend
  - added react query to all Admin data

### May 30, 2022 DESCW-360

- backend
  - new migration to permit data load from production
  - new seed that can load data from production, if present
    - only (re)loads production data if it is there, does nothing but updates ID sequences otherwise.
    - uses the `production_seeds` directory
      - updated `.gitignore` to prevent you from committing production data to repo
    - added nReadLine package to read seed data line-by-line in order to reduce memory usage
    - see the `pmo-mssql-converter` repo for more information

### May 18, 2022 DESCW-363

- backend
  - API
    - added backend API for picker_options

### May 17, 2022 DESCW-382

- frontend
  - implemented react-query for project details api

### May 16, 2022 DESCW-362

- frontend
  - Added sub menu for admin links

### May 13, 2022

- backend
  - added new migrations and seeds for picklists database table

### May 6, 2022

- DESCW-271 - improve linter standards
  - frontend and backend
    - you will need to do an `npm i` in `frontend` and `backend` directories to get the updated linter dependencies, if you have been working on the codebase before this commit.

### May 5, 2022 DESCW-324, DESCW-368, DESCW-369, DESCW-370, DESCW-371

- backend
  - added new migrations and seeds for projects database table
  - API
    - added backend API for projects
- frontend
  - added projects table
  - added route for projects

### May 4, 2022 DESCW-297

- frontend
  - added signout button/funcionality

### May 2, 2022 DESCW-280

- frontend
  - added new header, footer and sidebar
- Add CODEOWNERS file.

### April 26, 2022 DESCW-279

- frontend
  - added subcontractors table

### April 19, 2022 DESCW-275

- frontend
  - added hook that formats table data for use in Material UI Tables
  - added suppliers table
  - updated suppliers routes to point to the updated suppliers page

### April 11, 2022 DESCW-76

- frontend
  - added route for subcontractors
  - added test for subcontractors route

### April 8, 2022 DESCW-282, DESCW-278, DESCW-278, DESCW-281

- backend
  - added new migrations and seeds for subcontractors database table
  - added new migrations and seeds for suppliers database table
  - API
    - added backend API for suppliers
    - added tests for suppliers API
    - added backend API for subcontractors
    - added tests for subcontractors API

### April 5, 2022 DESCW-234

- backend
  - added backend API for contacts
  - added tests for contacts API

### April 1, 2022 DESCW-269

- added functionality that auto creates API's

### March 24, 2022 DESCW-233

- added new migrations and seeds for contacts database table

### March 11, 2022 DESCW-201

- fixes to make `docker compose up` work with (co)lima.
  - this change moves the database storage volume inside the VM, so your database will be blank; don't forget to:
    - `docker compose exec backend npx knex migrate:latest`
    - `docker compose exec backend npx knex seed:run`

### February 1, 2022 WD-3678

- frontend
  - added new table component from MUI
  - added contacts component that leverages the table component

### January 18, 2022 WD-3772

- backend
  - added new migrations and seeds for roles, user_roles, role_capabilities, and capabilities tables
  - added resolution of capabilities via database.

### January 17, 2022 WD-3815 part 4

- backend
  - various small changes to please the linter in preparation for enabling backend linting check github action.

### January 14, 2022 WD-3774

- backend
  - added user role checking for the user controller.
  - updated tests.
- removed frontend/.env file and consolidated .gitignore

### January 14, 2022 WD-3815 part 3

- backend
  - added logging for when connected to database, but the schema is wrong
- openshift
  - api
    - attempt a database migration to the latest migration on startup
  - templates: a build automation fix
- github workflows
  - fix overlooked item: don't rebuild containers on non-code file changes
- local dev environment
  - fix overlooked item: don't copy new transients into container builds

### January 12, 2022 WD-3815 part 2

- backend
  - added info to log about database being connected to
- openshift
  - permit api to connect to the database container
  - various cleanups

### January 12, 2022 WD-3691

- add material UI, including theming, icons
- add users table and related components

### January 11, 2022 WD-3815 part 2

- backend
  - added secretfile support for openshift database password
  - auth fix
  - autodeploy fix
- openshift
  - removed postgres alpine image from imagestream; alpine won't work for postgres on openshift without needless suffering. we will probably use hosted postgres eventually.
  - added configmap for keycloak endpoint, and database config parameters
  - changed backend deploy to use database and keycloak params
- other
  - deduplicated parameters in docker-compose.yml
  - migrated docker web directory to the docker directory to clean up the root

### January 11, 2022 WD-3815

- backend
  - added unified logger (facilities/logging.js)
    - set environment variable NODE_ENV to 'production' when deploying to production
    - uses pino library for logging in the whole app (fastify uses it, and it is pretty slick)
      - there is one logger instance, with the option to use child logger instances
        - conveniently group log entries by file/role/request
        - usage: `const log = require('../facilities/logging.js')(module.filename);` at the top of your file that needs logging
          - the `module.filename` makes a new child logger for you that will group all log messages in that file for you
          - use `log.child({ subcomponent: 'someUniqueStringYouLike' })` to make a sub-child log if you need. perhaps for logging individual requests/sessions.
    - updated fastify to use new logger
    - updated database to use new logger
  - moved database auto-deploy logic to a more appropriate spot (startup, not every db check)
  - cleanup server.js: moved shutdown handlers into daemon.js
  - restructuring
    - new directory: facilities: for full-on components, not just helpers
    - moved daemon.js to facilities directory
    - helpers/auth.js -> facilities/keycloak.js because keycloak items are what is in there, and it is more than helpers
    - helpers/server.js -> facilities/fastify.js because fastify configuration items are in there, and fastify is not just a helper

### January 10, 2022 WD-3771

- backend
  - included fastify-plugin to package.json
  - Added **getUserInfo** function to backend/src/helpers/auth.js -> gets user info from bearer token.
  - added .register(fastifyRoles) to backend/src/helpers/config.json -> register fastify roles plugin.
  - added plugin fastifyRoles
  - changed the logger default level to debug.
  - structure for payload is now {data: payload} instead of just payload, this allows other objects to be passed along with the data.
  - updated the validator logic for the data attribute.
  - added checkPermissions in user controller as a function that might be used for checking against capabilities, and allowed endpoints.

## January 10, 2022

- fix log volume issue for nginx reverse proxy
- flesh out readmes a bit more
- add user to DB on first login

### January 4, 2022

- update pullrequest template
- updated docker-compose file to include db variables
- frontend
  - fixed user endpoint user -> users
- backend
  - added knexfile.js to nodeman watch
