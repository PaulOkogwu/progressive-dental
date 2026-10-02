import type { ImageMetadata } from 'astro';
import dentures from '../assets/img/services/2565434.jpg';
import emax from '../assets/img/services/971768.jpg';
import pfm from '../assets/img/services/2408475.jpg';
import easyshade from '../assets/img/services/1817940.jpg';
import relines from '../assets/img/services/3604676.jpg';
import nobel from '../assets/img/services/3443599.jpg';
import fullcast from '../assets/img/services/2448792.jpg';
import implants from '../assets/img/services/7926945.jpg';
import partial from '../assets/img/services/2941103.jpg';

export interface Service {
  id: string;
  name: string;
  short: string; // one-line spec for indexes
  body: string[];
  specs: string[];
  img: ImageMetadata;
  alt: string;
}

// Copy follows the current site, with spelling fixes listed for client approval
// (Feldapathic → feldspathic, Nobel alloys → Noble alloys, Nobel Bio-Care → Nobel Biocare).
export const services: Service[] = [
  {
    id: 'complete-dentures', name: 'Complete Dentures', short: 'Palajet injection system',
    body: ['Our dentures are processed using the Palajet injection system from Heraeus Kulzer.', 'Injection gives the denture acrylic a higher density and a better adaptation to the master model.'],
    specs: ['Palajet injection', 'Heraeus Kulzer'],
    img: dentures, alt: 'Upper and lower complete dentures with pink acrylic bases',
  },
  {
    id: 'emax', name: 'e.max and All-Ceramic Systems', short: 'Lithium disilicate 400 MPa · zirconia 900 MPa',
    body: ['e.max delivers high-strength, highly aesthetic materials for both press and CAD/CAM technology.', 'e.max Press is a lithium disilicate glass ceramic with a flexural strength of 400 MPa. e.max ZirCAD is a zirconium oxide with a flexural strength of 900 MPa.'],
    specs: ['e.max Press · 400 MPa', 'e.max ZirCAD · 900 MPa'],
    img: emax, alt: 'IPS e.max ZirPress and e.max Press ceramic ingots in several shades',
  },
  {
    id: 'pfm', name: 'PFM: Porcelain Fused to Metal', short: 'High Noble and Noble alloys',
    body: ['We offer High Noble and Noble alloys, with porcelain ranging from feldspathic to non-leucite structures.'],
    specs: ['High Noble alloys', 'Noble alloys', 'Feldspathic to non-leucite porcelain'],
    img: pfm, alt: 'Three-unit porcelain-fused-to-metal bridge showing the metal substructure',
  },
  {
    id: 'vita-easyshade', name: 'Vita Easyshade', short: 'Digital custom shade taking',
    body: ['Custom shades taken with the latest technology, so the finished restoration matches the natural dentition.'],
    specs: ['Vita Easyshade', 'Custom shade'],
    img: easyshade, alt: 'Vita Easyshade digital shade-taking device beside a shade guide',
  },
  {
    id: 'relines-repairs', name: 'Relines & Repairs', short: 'Same day in most cases',
    body: ['Same-day repairs and relines are available in most cases.'],
    specs: ['Same-day service, most cases'],
    img: relines, alt: 'Smiling woman biting into a slice of watermelon',
  },
  {
    id: 'nobel-biocare', name: 'Nobel Biocare CAD/CAM Zirconia', short: 'Zirconium oxide frameworks and custom abutments',
    body: ['Nobel Biocare CAD/CAM zirconium oxide frameworks for bridges, as well as CAD/CAM design for custom implant abutments.'],
    specs: ['Zirconium oxide frames', 'Custom implant abutments'],
    img: nobel, alt: 'Zirconia crowns seated on a stone model of the lower teeth',
  },
  {
    id: 'full-cast-crown', name: 'Full Cast Crown', short: 'Yellow-gold or silver finish',
    body: ['Our full cast crowns are available in two finishes: yellow-gold and silver colour.'],
    specs: ['Yellow-gold finish', 'Silver finish'],
    img: fullcast, alt: 'Polished full gold crown on a molar between natural teeth',
  },
  {
    id: 'implants', name: 'Implants', short: 'Single unit to full-mouth rehabilitation',
    body: ['We have experience from a single restoration to a full-mouth rehabilitation.', 'Our suppliers include some of the most recognized companies: Nobel Biocare, Straumann, Zimmer, 3i, Lifecore, Astra Tech and BioHorizons.'],
    specs: ['Nobel Biocare', 'Straumann', 'Zimmer', '3i', 'Lifecore', 'Astra Tech', 'BioHorizons'],
    img: implants, alt: 'Cross-section illustration of a dental implant with a crown between two natural teeth',
  },
  {
    id: 'cast-partial-denture', name: 'Cast Partial Denture', short: 'WIRONIUM cobalt-chrome by Bego',
    body: ['A revolution in cobalt-chrome alloys: WIRONIUM by Bego contains no nickel or beryllium, with a greater elongation limit and superior strength.', 'Your patients enjoy the benefit of enhanced aesthetics and an improved design when you select WIRONIUM.'],
    specs: ['WIRONIUM · Bego', 'Nickel-free', 'Beryllium-free'],
    img: partial, alt: 'Cast cobalt-chrome partial denture framework with clasps',
  },
];

export const digital = {
  id: 'digital-3shape', name: 'Digital Workflow with 3Shape', short: 'Digital impressions to finished restoration',
};
