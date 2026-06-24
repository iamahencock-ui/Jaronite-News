var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_modules_watch_stub();
  }
});

// ../../AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "../../AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// node_modules/mime/Mime.js
var require_Mime = __commonJS({
  "node_modules/mime/Mime.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    function Mime() {
      this._types = /* @__PURE__ */ Object.create(null);
      this._extensions = /* @__PURE__ */ Object.create(null);
      for (let i = 0; i < arguments.length; i++) {
        this.define(arguments[i]);
      }
      this.define = this.define.bind(this);
      this.getType = this.getType.bind(this);
      this.getExtension = this.getExtension.bind(this);
    }
    __name(Mime, "Mime");
    Mime.prototype.define = function(typeMap, force) {
      for (let type in typeMap) {
        let extensions = typeMap[type].map(function(t) {
          return t.toLowerCase();
        });
        type = type.toLowerCase();
        for (let i = 0; i < extensions.length; i++) {
          const ext = extensions[i];
          if (ext[0] === "*") {
            continue;
          }
          if (!force && ext in this._types) {
            throw new Error(
              'Attempt to change mapping for "' + ext + '" extension from "' + this._types[ext] + '" to "' + type + '". Pass `force=true` to allow this, otherwise remove "' + ext + '" from the list of extensions for "' + type + '".'
            );
          }
          this._types[ext] = type;
        }
        if (force || !this._extensions[type]) {
          const ext = extensions[0];
          this._extensions[type] = ext[0] !== "*" ? ext : ext.substr(1);
        }
      }
    };
    Mime.prototype.getType = function(path) {
      path = String(path);
      let last = path.replace(/^.*[/\\]/, "").toLowerCase();
      let ext = last.replace(/^.*\./, "").toLowerCase();
      let hasPath = last.length < path.length;
      let hasDot = ext.length < last.length - 1;
      return (hasDot || !hasPath) && this._types[ext] || null;
    };
    Mime.prototype.getExtension = function(type) {
      type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
      return type && this._extensions[type.toLowerCase()] || null;
    };
    module.exports = Mime;
  }
});

// node_modules/mime/types/standard.js
var require_standard = __commonJS({
  "node_modules/mime/types/standard.js"(exports, module) {
    init_modules_watch_stub();
    module.exports = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["es", "ecma"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/express": ["exp"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/trig": ["trig"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/step+xml": ["stpx"], "model/step+zip": ["stpz"], "model/step-xml+zip": ["stpxz"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };
  }
});

// node_modules/mime/types/other.js
var require_other = __commonJS({
  "node_modules/mime/types/other.js"(exports, module) {
    init_modules_watch_stub();
    module.exports = { "application/prs.cww": ["cww"], "application/vnd.1000minds.decision-model+xml": ["1km"], "application/vnd.3gpp.pic-bw-large": ["plb"], "application/vnd.3gpp.pic-bw-small": ["psb"], "application/vnd.3gpp.pic-bw-var": ["pvb"], "application/vnd.3gpp2.tcap": ["tcap"], "application/vnd.3m.post-it-notes": ["pwn"], "application/vnd.accpac.simply.aso": ["aso"], "application/vnd.accpac.simply.imp": ["imp"], "application/vnd.acucobol": ["acu"], "application/vnd.acucorp": ["atc", "acutc"], "application/vnd.adobe.air-application-installer-package+zip": ["air"], "application/vnd.adobe.formscentral.fcdt": ["fcdt"], "application/vnd.adobe.fxp": ["fxp", "fxpl"], "application/vnd.adobe.xdp+xml": ["xdp"], "application/vnd.adobe.xfdf": ["xfdf"], "application/vnd.ahead.space": ["ahead"], "application/vnd.airzip.filesecure.azf": ["azf"], "application/vnd.airzip.filesecure.azs": ["azs"], "application/vnd.amazon.ebook": ["azw"], "application/vnd.americandynamics.acc": ["acc"], "application/vnd.amiga.ami": ["ami"], "application/vnd.android.package-archive": ["apk"], "application/vnd.anser-web-certificate-issue-initiation": ["cii"], "application/vnd.anser-web-funds-transfer-initiation": ["fti"], "application/vnd.antix.game-component": ["atx"], "application/vnd.apple.installer+xml": ["mpkg"], "application/vnd.apple.keynote": ["key"], "application/vnd.apple.mpegurl": ["m3u8"], "application/vnd.apple.numbers": ["numbers"], "application/vnd.apple.pages": ["pages"], "application/vnd.apple.pkpass": ["pkpass"], "application/vnd.aristanetworks.swi": ["swi"], "application/vnd.astraea-software.iota": ["iota"], "application/vnd.audiograph": ["aep"], "application/vnd.balsamiq.bmml+xml": ["bmml"], "application/vnd.blueice.multipass": ["mpm"], "application/vnd.bmi": ["bmi"], "application/vnd.businessobjects": ["rep"], "application/vnd.chemdraw+xml": ["cdxml"], "application/vnd.chipnuts.karaoke-mmd": ["mmd"], "application/vnd.cinderella": ["cdy"], "application/vnd.citationstyles.style+xml": ["csl"], "application/vnd.claymore": ["cla"], "application/vnd.cloanto.rp9": ["rp9"], "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"], "application/vnd.cluetrust.cartomobile-config": ["c11amc"], "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"], "application/vnd.commonspace": ["csp"], "application/vnd.contact.cmsg": ["cdbcmsg"], "application/vnd.cosmocaller": ["cmc"], "application/vnd.crick.clicker": ["clkx"], "application/vnd.crick.clicker.keyboard": ["clkk"], "application/vnd.crick.clicker.palette": ["clkp"], "application/vnd.crick.clicker.template": ["clkt"], "application/vnd.crick.clicker.wordbank": ["clkw"], "application/vnd.criticaltools.wbs+xml": ["wbs"], "application/vnd.ctc-posml": ["pml"], "application/vnd.cups-ppd": ["ppd"], "application/vnd.curl.car": ["car"], "application/vnd.curl.pcurl": ["pcurl"], "application/vnd.dart": ["dart"], "application/vnd.data-vision.rdz": ["rdz"], "application/vnd.dbf": ["dbf"], "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"], "application/vnd.dece.ttml+xml": ["uvt", "uvvt"], "application/vnd.dece.unspecified": ["uvx", "uvvx"], "application/vnd.dece.zip": ["uvz", "uvvz"], "application/vnd.denovo.fcselayout-link": ["fe_launch"], "application/vnd.dna": ["dna"], "application/vnd.dolby.mlp": ["mlp"], "application/vnd.dpgraph": ["dpg"], "application/vnd.dreamfactory": ["dfac"], "application/vnd.ds-keypoint": ["kpxx"], "application/vnd.dvb.ait": ["ait"], "application/vnd.dvb.service": ["svc"], "application/vnd.dynageo": ["geo"], "application/vnd.ecowin.chart": ["mag"], "application/vnd.enliven": ["nml"], "application/vnd.epson.esf": ["esf"], "application/vnd.epson.msf": ["msf"], "application/vnd.epson.quickanime": ["qam"], "application/vnd.epson.salt": ["slt"], "application/vnd.epson.ssf": ["ssf"], "application/vnd.eszigno3+xml": ["es3", "et3"], "application/vnd.ezpix-album": ["ez2"], "application/vnd.ezpix-package": ["ez3"], "application/vnd.fdf": ["fdf"], "application/vnd.fdsn.mseed": ["mseed"], "application/vnd.fdsn.seed": ["seed", "dataless"], "application/vnd.flographit": ["gph"], "application/vnd.fluxtime.clip": ["ftc"], "application/vnd.framemaker": ["fm", "frame", "maker", "book"], "application/vnd.frogans.fnc": ["fnc"], "application/vnd.frogans.ltf": ["ltf"], "application/vnd.fsc.weblaunch": ["fsc"], "application/vnd.fujitsu.oasys": ["oas"], "application/vnd.fujitsu.oasys2": ["oa2"], "application/vnd.fujitsu.oasys3": ["oa3"], "application/vnd.fujitsu.oasysgp": ["fg5"], "application/vnd.fujitsu.oasysprs": ["bh2"], "application/vnd.fujixerox.ddd": ["ddd"], "application/vnd.fujixerox.docuworks": ["xdw"], "application/vnd.fujixerox.docuworks.binder": ["xbd"], "application/vnd.fuzzysheet": ["fzs"], "application/vnd.genomatix.tuxedo": ["txd"], "application/vnd.geogebra.file": ["ggb"], "application/vnd.geogebra.tool": ["ggt"], "application/vnd.geometry-explorer": ["gex", "gre"], "application/vnd.geonext": ["gxt"], "application/vnd.geoplan": ["g2w"], "application/vnd.geospace": ["g3w"], "application/vnd.gmx": ["gmx"], "application/vnd.google-apps.document": ["gdoc"], "application/vnd.google-apps.presentation": ["gslides"], "application/vnd.google-apps.spreadsheet": ["gsheet"], "application/vnd.google-earth.kml+xml": ["kml"], "application/vnd.google-earth.kmz": ["kmz"], "application/vnd.grafeq": ["gqf", "gqs"], "application/vnd.groove-account": ["gac"], "application/vnd.groove-help": ["ghf"], "application/vnd.groove-identity-message": ["gim"], "application/vnd.groove-injector": ["grv"], "application/vnd.groove-tool-message": ["gtm"], "application/vnd.groove-tool-template": ["tpl"], "application/vnd.groove-vcard": ["vcg"], "application/vnd.hal+xml": ["hal"], "application/vnd.handheld-entertainment+xml": ["zmm"], "application/vnd.hbci": ["hbci"], "application/vnd.hhe.lesson-player": ["les"], "application/vnd.hp-hpgl": ["hpgl"], "application/vnd.hp-hpid": ["hpid"], "application/vnd.hp-hps": ["hps"], "application/vnd.hp-jlyt": ["jlt"], "application/vnd.hp-pcl": ["pcl"], "application/vnd.hp-pclxl": ["pclxl"], "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"], "application/vnd.ibm.minipay": ["mpy"], "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"], "application/vnd.ibm.rights-management": ["irm"], "application/vnd.ibm.secure-container": ["sc"], "application/vnd.iccprofile": ["icc", "icm"], "application/vnd.igloader": ["igl"], "application/vnd.immervision-ivp": ["ivp"], "application/vnd.immervision-ivu": ["ivu"], "application/vnd.insors.igm": ["igm"], "application/vnd.intercon.formnet": ["xpw", "xpx"], "application/vnd.intergeo": ["i2g"], "application/vnd.intu.qbo": ["qbo"], "application/vnd.intu.qfx": ["qfx"], "application/vnd.ipunplugged.rcprofile": ["rcprofile"], "application/vnd.irepository.package+xml": ["irp"], "application/vnd.is-xpr": ["xpr"], "application/vnd.isac.fcs": ["fcs"], "application/vnd.jam": ["jam"], "application/vnd.jcp.javame.midlet-rms": ["rms"], "application/vnd.jisp": ["jisp"], "application/vnd.joost.joda-archive": ["joda"], "application/vnd.kahootz": ["ktz", "ktr"], "application/vnd.kde.karbon": ["karbon"], "application/vnd.kde.kchart": ["chrt"], "application/vnd.kde.kformula": ["kfo"], "application/vnd.kde.kivio": ["flw"], "application/vnd.kde.kontour": ["kon"], "application/vnd.kde.kpresenter": ["kpr", "kpt"], "application/vnd.kde.kspread": ["ksp"], "application/vnd.kde.kword": ["kwd", "kwt"], "application/vnd.kenameaapp": ["htke"], "application/vnd.kidspiration": ["kia"], "application/vnd.kinar": ["kne", "knp"], "application/vnd.koan": ["skp", "skd", "skt", "skm"], "application/vnd.kodak-descriptor": ["sse"], "application/vnd.las.las+xml": ["lasxml"], "application/vnd.llamagraphics.life-balance.desktop": ["lbd"], "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"], "application/vnd.lotus-1-2-3": ["123"], "application/vnd.lotus-approach": ["apr"], "application/vnd.lotus-freelance": ["pre"], "application/vnd.lotus-notes": ["nsf"], "application/vnd.lotus-organizer": ["org"], "application/vnd.lotus-screencam": ["scm"], "application/vnd.lotus-wordpro": ["lwp"], "application/vnd.macports.portpkg": ["portpkg"], "application/vnd.mapbox-vector-tile": ["mvt"], "application/vnd.mcd": ["mcd"], "application/vnd.medcalcdata": ["mc1"], "application/vnd.mediastation.cdkey": ["cdkey"], "application/vnd.mfer": ["mwf"], "application/vnd.mfmp": ["mfm"], "application/vnd.micrografx.flo": ["flo"], "application/vnd.micrografx.igx": ["igx"], "application/vnd.mif": ["mif"], "application/vnd.mobius.daf": ["daf"], "application/vnd.mobius.dis": ["dis"], "application/vnd.mobius.mbk": ["mbk"], "application/vnd.mobius.mqy": ["mqy"], "application/vnd.mobius.msl": ["msl"], "application/vnd.mobius.plc": ["plc"], "application/vnd.mobius.txf": ["txf"], "application/vnd.mophun.application": ["mpn"], "application/vnd.mophun.certificate": ["mpc"], "application/vnd.mozilla.xul+xml": ["xul"], "application/vnd.ms-artgalry": ["cil"], "application/vnd.ms-cab-compressed": ["cab"], "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"], "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"], "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"], "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"], "application/vnd.ms-excel.template.macroenabled.12": ["xltm"], "application/vnd.ms-fontobject": ["eot"], "application/vnd.ms-htmlhelp": ["chm"], "application/vnd.ms-ims": ["ims"], "application/vnd.ms-lrm": ["lrm"], "application/vnd.ms-officetheme": ["thmx"], "application/vnd.ms-outlook": ["msg"], "application/vnd.ms-pki.seccat": ["cat"], "application/vnd.ms-pki.stl": ["*stl"], "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"], "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"], "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"], "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"], "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"], "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"], "application/vnd.ms-project": ["mpp", "mpt"], "application/vnd.ms-word.document.macroenabled.12": ["docm"], "application/vnd.ms-word.template.macroenabled.12": ["dotm"], "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"], "application/vnd.ms-wpl": ["wpl"], "application/vnd.ms-xpsdocument": ["xps"], "application/vnd.mseq": ["mseq"], "application/vnd.musician": ["mus"], "application/vnd.muvee.style": ["msty"], "application/vnd.mynfc": ["taglet"], "application/vnd.neurolanguage.nlu": ["nlu"], "application/vnd.nitf": ["ntf", "nitf"], "application/vnd.noblenet-directory": ["nnd"], "application/vnd.noblenet-sealer": ["nns"], "application/vnd.noblenet-web": ["nnw"], "application/vnd.nokia.n-gage.ac+xml": ["*ac"], "application/vnd.nokia.n-gage.data": ["ngdat"], "application/vnd.nokia.n-gage.symbian.install": ["n-gage"], "application/vnd.nokia.radio-preset": ["rpst"], "application/vnd.nokia.radio-presets": ["rpss"], "application/vnd.novadigm.edm": ["edm"], "application/vnd.novadigm.edx": ["edx"], "application/vnd.novadigm.ext": ["ext"], "application/vnd.oasis.opendocument.chart": ["odc"], "application/vnd.oasis.opendocument.chart-template": ["otc"], "application/vnd.oasis.opendocument.database": ["odb"], "application/vnd.oasis.opendocument.formula": ["odf"], "application/vnd.oasis.opendocument.formula-template": ["odft"], "application/vnd.oasis.opendocument.graphics": ["odg"], "application/vnd.oasis.opendocument.graphics-template": ["otg"], "application/vnd.oasis.opendocument.image": ["odi"], "application/vnd.oasis.opendocument.image-template": ["oti"], "application/vnd.oasis.opendocument.presentation": ["odp"], "application/vnd.oasis.opendocument.presentation-template": ["otp"], "application/vnd.oasis.opendocument.spreadsheet": ["ods"], "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"], "application/vnd.oasis.opendocument.text": ["odt"], "application/vnd.oasis.opendocument.text-master": ["odm"], "application/vnd.oasis.opendocument.text-template": ["ott"], "application/vnd.oasis.opendocument.text-web": ["oth"], "application/vnd.olpc-sugar": ["xo"], "application/vnd.oma.dd2+xml": ["dd2"], "application/vnd.openblox.game+xml": ["obgx"], "application/vnd.openofficeorg.extension": ["oxt"], "application/vnd.openstreetmap.data+xml": ["osm"], "application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"], "application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"], "application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"], "application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"], "application/vnd.osgeo.mapguide.package": ["mgp"], "application/vnd.osgi.dp": ["dp"], "application/vnd.osgi.subsystem": ["esa"], "application/vnd.palm": ["pdb", "pqa", "oprc"], "application/vnd.pawaafile": ["paw"], "application/vnd.pg.format": ["str"], "application/vnd.pg.osasli": ["ei6"], "application/vnd.picsel": ["efif"], "application/vnd.pmi.widget": ["wg"], "application/vnd.pocketlearn": ["plf"], "application/vnd.powerbuilder6": ["pbd"], "application/vnd.previewsystems.box": ["box"], "application/vnd.proteus.magazine": ["mgz"], "application/vnd.publishare-delta-tree": ["qps"], "application/vnd.pvi.ptid1": ["ptid"], "application/vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"], "application/vnd.rar": ["rar"], "application/vnd.realvnc.bed": ["bed"], "application/vnd.recordare.musicxml": ["mxl"], "application/vnd.recordare.musicxml+xml": ["musicxml"], "application/vnd.rig.cryptonote": ["cryptonote"], "application/vnd.rim.cod": ["cod"], "application/vnd.rn-realmedia": ["rm"], "application/vnd.rn-realmedia-vbr": ["rmvb"], "application/vnd.route66.link66+xml": ["link66"], "application/vnd.sailingtracker.track": ["st"], "application/vnd.seemail": ["see"], "application/vnd.sema": ["sema"], "application/vnd.semd": ["semd"], "application/vnd.semf": ["semf"], "application/vnd.shana.informed.formdata": ["ifm"], "application/vnd.shana.informed.formtemplate": ["itp"], "application/vnd.shana.informed.interchange": ["iif"], "application/vnd.shana.informed.package": ["ipk"], "application/vnd.simtech-mindmapper": ["twd", "twds"], "application/vnd.smaf": ["mmf"], "application/vnd.smart.teacher": ["teacher"], "application/vnd.software602.filler.form+xml": ["fo"], "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"], "application/vnd.spotfire.dxp": ["dxp"], "application/vnd.spotfire.sfs": ["sfs"], "application/vnd.stardivision.calc": ["sdc"], "application/vnd.stardivision.draw": ["sda"], "application/vnd.stardivision.impress": ["sdd"], "application/vnd.stardivision.math": ["smf"], "application/vnd.stardivision.writer": ["sdw", "vor"], "application/vnd.stardivision.writer-global": ["sgl"], "application/vnd.stepmania.package": ["smzip"], "application/vnd.stepmania.stepchart": ["sm"], "application/vnd.sun.wadl+xml": ["wadl"], "application/vnd.sun.xml.calc": ["sxc"], "application/vnd.sun.xml.calc.template": ["stc"], "application/vnd.sun.xml.draw": ["sxd"], "application/vnd.sun.xml.draw.template": ["std"], "application/vnd.sun.xml.impress": ["sxi"], "application/vnd.sun.xml.impress.template": ["sti"], "application/vnd.sun.xml.math": ["sxm"], "application/vnd.sun.xml.writer": ["sxw"], "application/vnd.sun.xml.writer.global": ["sxg"], "application/vnd.sun.xml.writer.template": ["stw"], "application/vnd.sus-calendar": ["sus", "susp"], "application/vnd.svd": ["svd"], "application/vnd.symbian.install": ["sis", "sisx"], "application/vnd.syncml+xml": ["xsm"], "application/vnd.syncml.dm+wbxml": ["bdm"], "application/vnd.syncml.dm+xml": ["xdm"], "application/vnd.syncml.dmddf+xml": ["ddf"], "application/vnd.tao.intent-module-archive": ["tao"], "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"], "application/vnd.tmobile-livetv": ["tmo"], "application/vnd.trid.tpt": ["tpt"], "application/vnd.triscape.mxs": ["mxs"], "application/vnd.trueapp": ["tra"], "application/vnd.ufdl": ["ufd", "ufdl"], "application/vnd.uiq.theme": ["utz"], "application/vnd.umajin": ["umj"], "application/vnd.unity": ["unityweb"], "application/vnd.uoml+xml": ["uoml"], "application/vnd.vcx": ["vcx"], "application/vnd.visio": ["vsd", "vst", "vss", "vsw"], "application/vnd.visionary": ["vis"], "application/vnd.vsf": ["vsf"], "application/vnd.wap.wbxml": ["wbxml"], "application/vnd.wap.wmlc": ["wmlc"], "application/vnd.wap.wmlscriptc": ["wmlsc"], "application/vnd.webturbo": ["wtb"], "application/vnd.wolfram.player": ["nbp"], "application/vnd.wordperfect": ["wpd"], "application/vnd.wqd": ["wqd"], "application/vnd.wt.stf": ["stf"], "application/vnd.xara": ["xar"], "application/vnd.xfdl": ["xfdl"], "application/vnd.yamaha.hv-dic": ["hvd"], "application/vnd.yamaha.hv-script": ["hvs"], "application/vnd.yamaha.hv-voice": ["hvp"], "application/vnd.yamaha.openscoreformat": ["osf"], "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"], "application/vnd.yamaha.smaf-audio": ["saf"], "application/vnd.yamaha.smaf-phrase": ["spf"], "application/vnd.yellowriver-custom-menu": ["cmp"], "application/vnd.zul": ["zir", "zirz"], "application/vnd.zzazz.deck+xml": ["zaz"], "application/x-7z-compressed": ["7z"], "application/x-abiword": ["abw"], "application/x-ace-compressed": ["ace"], "application/x-apple-diskimage": ["*dmg"], "application/x-arj": ["arj"], "application/x-authorware-bin": ["aab", "x32", "u32", "vox"], "application/x-authorware-map": ["aam"], "application/x-authorware-seg": ["aas"], "application/x-bcpio": ["bcpio"], "application/x-bdoc": ["*bdoc"], "application/x-bittorrent": ["torrent"], "application/x-blorb": ["blb", "blorb"], "application/x-bzip": ["bz"], "application/x-bzip2": ["bz2", "boz"], "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"], "application/x-cdlink": ["vcd"], "application/x-cfs-compressed": ["cfs"], "application/x-chat": ["chat"], "application/x-chess-pgn": ["pgn"], "application/x-chrome-extension": ["crx"], "application/x-cocoa": ["cco"], "application/x-conference": ["nsc"], "application/x-cpio": ["cpio"], "application/x-csh": ["csh"], "application/x-debian-package": ["*deb", "udeb"], "application/x-dgc-compressed": ["dgc"], "application/x-director": ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"], "application/x-doom": ["wad"], "application/x-dtbncx+xml": ["ncx"], "application/x-dtbook+xml": ["dtb"], "application/x-dtbresource+xml": ["res"], "application/x-dvi": ["dvi"], "application/x-envoy": ["evy"], "application/x-eva": ["eva"], "application/x-font-bdf": ["bdf"], "application/x-font-ghostscript": ["gsf"], "application/x-font-linux-psf": ["psf"], "application/x-font-pcf": ["pcf"], "application/x-font-snf": ["snf"], "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"], "application/x-freearc": ["arc"], "application/x-futuresplash": ["spl"], "application/x-gca-compressed": ["gca"], "application/x-glulx": ["ulx"], "application/x-gnumeric": ["gnumeric"], "application/x-gramps-xml": ["gramps"], "application/x-gtar": ["gtar"], "application/x-hdf": ["hdf"], "application/x-httpd-php": ["php"], "application/x-install-instructions": ["install"], "application/x-iso9660-image": ["*iso"], "application/x-iwork-keynote-sffkey": ["*key"], "application/x-iwork-numbers-sffnumbers": ["*numbers"], "application/x-iwork-pages-sffpages": ["*pages"], "application/x-java-archive-diff": ["jardiff"], "application/x-java-jnlp-file": ["jnlp"], "application/x-keepass2": ["kdbx"], "application/x-latex": ["latex"], "application/x-lua-bytecode": ["luac"], "application/x-lzh-compressed": ["lzh", "lha"], "application/x-makeself": ["run"], "application/x-mie": ["mie"], "application/x-mobipocket-ebook": ["prc", "mobi"], "application/x-ms-application": ["application"], "application/x-ms-shortcut": ["lnk"], "application/x-ms-wmd": ["wmd"], "application/x-ms-wmz": ["wmz"], "application/x-ms-xbap": ["xbap"], "application/x-msaccess": ["mdb"], "application/x-msbinder": ["obd"], "application/x-mscardfile": ["crd"], "application/x-msclip": ["clp"], "application/x-msdos-program": ["*exe"], "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"], "application/x-msmediaview": ["mvb", "m13", "m14"], "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"], "application/x-msmoney": ["mny"], "application/x-mspublisher": ["pub"], "application/x-msschedule": ["scd"], "application/x-msterminal": ["trm"], "application/x-mswrite": ["wri"], "application/x-netcdf": ["nc", "cdf"], "application/x-ns-proxy-autoconfig": ["pac"], "application/x-nzb": ["nzb"], "application/x-perl": ["pl", "pm"], "application/x-pilot": ["*prc", "*pdb"], "application/x-pkcs12": ["p12", "pfx"], "application/x-pkcs7-certificates": ["p7b", "spc"], "application/x-pkcs7-certreqresp": ["p7r"], "application/x-rar-compressed": ["*rar"], "application/x-redhat-package-manager": ["rpm"], "application/x-research-info-systems": ["ris"], "application/x-sea": ["sea"], "application/x-sh": ["sh"], "application/x-shar": ["shar"], "application/x-shockwave-flash": ["swf"], "application/x-silverlight-app": ["xap"], "application/x-sql": ["sql"], "application/x-stuffit": ["sit"], "application/x-stuffitx": ["sitx"], "application/x-subrip": ["srt"], "application/x-sv4cpio": ["sv4cpio"], "application/x-sv4crc": ["sv4crc"], "application/x-t3vm-image": ["t3"], "application/x-tads": ["gam"], "application/x-tar": ["tar"], "application/x-tcl": ["tcl", "tk"], "application/x-tex": ["tex"], "application/x-tex-tfm": ["tfm"], "application/x-texinfo": ["texinfo", "texi"], "application/x-tgif": ["*obj"], "application/x-ustar": ["ustar"], "application/x-virtualbox-hdd": ["hdd"], "application/x-virtualbox-ova": ["ova"], "application/x-virtualbox-ovf": ["ovf"], "application/x-virtualbox-vbox": ["vbox"], "application/x-virtualbox-vbox-extpack": ["vbox-extpack"], "application/x-virtualbox-vdi": ["vdi"], "application/x-virtualbox-vhd": ["vhd"], "application/x-virtualbox-vmdk": ["vmdk"], "application/x-wais-source": ["src"], "application/x-web-app-manifest+json": ["webapp"], "application/x-x509-ca-cert": ["der", "crt", "pem"], "application/x-xfig": ["fig"], "application/x-xliff+xml": ["*xlf"], "application/x-xpinstall": ["xpi"], "application/x-xz": ["xz"], "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"], "audio/vnd.dece.audio": ["uva", "uvva"], "audio/vnd.digital-winds": ["eol"], "audio/vnd.dra": ["dra"], "audio/vnd.dts": ["dts"], "audio/vnd.dts.hd": ["dtshd"], "audio/vnd.lucent.voice": ["lvp"], "audio/vnd.ms-playready.media.pya": ["pya"], "audio/vnd.nuera.ecelp4800": ["ecelp4800"], "audio/vnd.nuera.ecelp7470": ["ecelp7470"], "audio/vnd.nuera.ecelp9600": ["ecelp9600"], "audio/vnd.rip": ["rip"], "audio/x-aac": ["aac"], "audio/x-aiff": ["aif", "aiff", "aifc"], "audio/x-caf": ["caf"], "audio/x-flac": ["flac"], "audio/x-m4a": ["*m4a"], "audio/x-matroska": ["mka"], "audio/x-mpegurl": ["m3u"], "audio/x-ms-wax": ["wax"], "audio/x-ms-wma": ["wma"], "audio/x-pn-realaudio": ["ram", "ra"], "audio/x-pn-realaudio-plugin": ["rmp"], "audio/x-realaudio": ["*ra"], "audio/x-wav": ["*wav"], "chemical/x-cdx": ["cdx"], "chemical/x-cif": ["cif"], "chemical/x-cmdf": ["cmdf"], "chemical/x-cml": ["cml"], "chemical/x-csml": ["csml"], "chemical/x-xyz": ["xyz"], "image/prs.btif": ["btif"], "image/prs.pti": ["pti"], "image/vnd.adobe.photoshop": ["psd"], "image/vnd.airzip.accelerator.azv": ["azv"], "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"], "image/vnd.djvu": ["djvu", "djv"], "image/vnd.dvb.subtitle": ["*sub"], "image/vnd.dwg": ["dwg"], "image/vnd.dxf": ["dxf"], "image/vnd.fastbidsheet": ["fbs"], "image/vnd.fpx": ["fpx"], "image/vnd.fst": ["fst"], "image/vnd.fujixerox.edmics-mmr": ["mmr"], "image/vnd.fujixerox.edmics-rlc": ["rlc"], "image/vnd.microsoft.icon": ["ico"], "image/vnd.ms-dds": ["dds"], "image/vnd.ms-modi": ["mdi"], "image/vnd.ms-photo": ["wdp"], "image/vnd.net-fpx": ["npx"], "image/vnd.pco.b16": ["b16"], "image/vnd.tencent.tap": ["tap"], "image/vnd.valve.source.texture": ["vtf"], "image/vnd.wap.wbmp": ["wbmp"], "image/vnd.xiff": ["xif"], "image/vnd.zbrush.pcx": ["pcx"], "image/x-3ds": ["3ds"], "image/x-cmu-raster": ["ras"], "image/x-cmx": ["cmx"], "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"], "image/x-icon": ["*ico"], "image/x-jng": ["jng"], "image/x-mrsid-image": ["sid"], "image/x-ms-bmp": ["*bmp"], "image/x-pcx": ["*pcx"], "image/x-pict": ["pic", "pct"], "image/x-portable-anymap": ["pnm"], "image/x-portable-bitmap": ["pbm"], "image/x-portable-graymap": ["pgm"], "image/x-portable-pixmap": ["ppm"], "image/x-rgb": ["rgb"], "image/x-tga": ["tga"], "image/x-xbitmap": ["xbm"], "image/x-xpixmap": ["xpm"], "image/x-xwindowdump": ["xwd"], "message/vnd.wfa.wsc": ["wsc"], "model/vnd.collada+xml": ["dae"], "model/vnd.dwf": ["dwf"], "model/vnd.gdl": ["gdl"], "model/vnd.gtw": ["gtw"], "model/vnd.mts": ["mts"], "model/vnd.opengex": ["ogex"], "model/vnd.parasolid.transmit.binary": ["x_b"], "model/vnd.parasolid.transmit.text": ["x_t"], "model/vnd.sap.vds": ["vds"], "model/vnd.usdz+zip": ["usdz"], "model/vnd.valve.source.compiled-map": ["bsp"], "model/vnd.vtu": ["vtu"], "text/prs.lines.tag": ["dsc"], "text/vnd.curl": ["curl"], "text/vnd.curl.dcurl": ["dcurl"], "text/vnd.curl.mcurl": ["mcurl"], "text/vnd.curl.scurl": ["scurl"], "text/vnd.dvb.subtitle": ["sub"], "text/vnd.fly": ["fly"], "text/vnd.fmi.flexstor": ["flx"], "text/vnd.graphviz": ["gv"], "text/vnd.in3d.3dml": ["3dml"], "text/vnd.in3d.spot": ["spot"], "text/vnd.sun.j2me.app-descriptor": ["jad"], "text/vnd.wap.wml": ["wml"], "text/vnd.wap.wmlscript": ["wmls"], "text/x-asm": ["s", "asm"], "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"], "text/x-component": ["htc"], "text/x-fortran": ["f", "for", "f77", "f90"], "text/x-handlebars-template": ["hbs"], "text/x-java-source": ["java"], "text/x-lua": ["lua"], "text/x-markdown": ["mkd"], "text/x-nfo": ["nfo"], "text/x-opml": ["opml"], "text/x-org": ["*org"], "text/x-pascal": ["p", "pas"], "text/x-processing": ["pde"], "text/x-sass": ["sass"], "text/x-scss": ["scss"], "text/x-setext": ["etx"], "text/x-sfv": ["sfv"], "text/x-suse-ymp": ["ymp"], "text/x-uuencode": ["uu"], "text/x-vcalendar": ["vcs"], "text/x-vcard": ["vcf"], "video/vnd.dece.hd": ["uvh", "uvvh"], "video/vnd.dece.mobile": ["uvm", "uvvm"], "video/vnd.dece.pd": ["uvp", "uvvp"], "video/vnd.dece.sd": ["uvs", "uvvs"], "video/vnd.dece.video": ["uvv", "uvvv"], "video/vnd.dvb.file": ["dvb"], "video/vnd.fvt": ["fvt"], "video/vnd.mpegurl": ["mxu", "m4u"], "video/vnd.ms-playready.media.pyv": ["pyv"], "video/vnd.uvvu.mp4": ["uvu", "uvvu"], "video/vnd.vivo": ["viv"], "video/x-f4v": ["f4v"], "video/x-fli": ["fli"], "video/x-flv": ["flv"], "video/x-m4v": ["m4v"], "video/x-matroska": ["mkv", "mk3d", "mks"], "video/x-mng": ["mng"], "video/x-ms-asf": ["asf", "asx"], "video/x-ms-vob": ["vob"], "video/x-ms-wm": ["wm"], "video/x-ms-wmv": ["wmv"], "video/x-ms-wmx": ["wmx"], "video/x-ms-wvx": ["wvx"], "video/x-msvideo": ["avi"], "video/x-sgi-movie": ["movie"], "video/x-smv": ["smv"], "x-conference/x-cooltalk": ["ice"] };
  }
});

// node_modules/mime/index.js
var require_mime = __commonJS({
  "node_modules/mime/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var Mime = require_Mime();
    module.exports = new Mime(require_standard(), require_other());
  }
});

// node_modules/@cloudflare/kv-asset-handler/dist/types.js
var require_types = __commonJS({
  "node_modules/@cloudflare/kv-asset-handler/dist/types.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InternalError = exports.NotFoundError = exports.MethodNotAllowedError = exports.KVError = void 0;
    var KVError = class _KVError extends Error {
      static {
        __name(this, "KVError");
      }
      constructor(message, status = 500) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = _KVError.name;
        this.status = status;
      }
      status;
    };
    exports.KVError = KVError;
    var MethodNotAllowedError = class extends KVError {
      static {
        __name(this, "MethodNotAllowedError");
      }
      constructor(message = `Not a valid request method`, status = 405) {
        super(message, status);
      }
    };
    exports.MethodNotAllowedError = MethodNotAllowedError;
    var NotFoundError = class extends KVError {
      static {
        __name(this, "NotFoundError");
      }
      constructor(message = `Not Found`, status = 404) {
        super(message, status);
      }
    };
    exports.NotFoundError = NotFoundError;
    var InternalError = class extends KVError {
      static {
        __name(this, "InternalError");
      }
      constructor(message = `Internal Error in KV Asset Handler`, status = 500) {
        super(message, status);
      }
    };
    exports.InternalError = InternalError;
  }
});

// node_modules/@cloudflare/kv-asset-handler/dist/index.js
var require_dist = __commonJS({
  "node_modules/@cloudflare/kv-asset-handler/dist/index.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: /* @__PURE__ */ __name(function() {
          return m[k];
        }, "get") };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InternalError = exports.NotFoundError = exports.MethodNotAllowedError = exports.serveSinglePageApp = exports.mapRequestToAsset = exports.getAssetFromKV = void 0;
    var mime = __importStar(require_mime());
    var types_1 = require_types();
    Object.defineProperty(exports, "InternalError", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return types_1.InternalError;
    }, "get") });
    Object.defineProperty(exports, "MethodNotAllowedError", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return types_1.MethodNotAllowedError;
    }, "get") });
    Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return types_1.NotFoundError;
    }, "get") });
    var defaultCacheControl = {
      browserTTL: null,
      edgeTTL: 2 * 60 * 60 * 24,
      // 2 days
      bypassCache: false
      // do not bypass Cloudflare's cache
    };
    var parseStringAsObject = /* @__PURE__ */ __name((maybeString) => typeof maybeString === "string" ? JSON.parse(maybeString) : maybeString, "parseStringAsObject");
    var getAssetFromKVDefaultOptions = {
      ASSET_NAMESPACE: typeof __STATIC_CONTENT !== "undefined" ? __STATIC_CONTENT : void 0,
      ASSET_MANIFEST: typeof __STATIC_CONTENT_MANIFEST !== "undefined" ? parseStringAsObject(__STATIC_CONTENT_MANIFEST) : {},
      cacheControl: defaultCacheControl,
      defaultMimeType: "text/plain",
      defaultDocument: "index.html",
      pathIsEncoded: false,
      defaultETag: "strong"
    };
    function assignOptions(options) {
      return Object.assign({}, getAssetFromKVDefaultOptions, options);
    }
    __name(assignOptions, "assignOptions");
    var mapRequestToAsset = /* @__PURE__ */ __name((request, options) => {
      options = assignOptions(options);
      const parsedUrl = new URL(request.url);
      let pathname = parsedUrl.pathname;
      if (pathname.endsWith("/")) {
        pathname = pathname.concat(options.defaultDocument);
      } else if (!mime.getType(pathname)) {
        pathname = pathname.concat("/" + options.defaultDocument);
      }
      parsedUrl.pathname = pathname;
      return new Request(parsedUrl.toString(), request);
    }, "mapRequestToAsset");
    exports.mapRequestToAsset = mapRequestToAsset;
    function serveSinglePageApp(request, options) {
      options = assignOptions(options);
      request = mapRequestToAsset(request, options);
      const parsedUrl = new URL(request.url);
      if (parsedUrl.pathname.endsWith(".html")) {
        return new Request(`${parsedUrl.origin}/${options.defaultDocument}`, request);
      } else {
        return request;
      }
    }
    __name(serveSinglePageApp, "serveSinglePageApp");
    exports.serveSinglePageApp = serveSinglePageApp;
    var getAssetFromKV2 = /* @__PURE__ */ __name(async (event, options) => {
      options = assignOptions(options);
      const request = event.request;
      const ASSET_NAMESPACE = options.ASSET_NAMESPACE;
      const ASSET_MANIFEST = parseStringAsObject(options.ASSET_MANIFEST);
      if (typeof ASSET_NAMESPACE === "undefined") {
        throw new types_1.InternalError(`there is no KV namespace bound to the script`);
      }
      const rawPathKey = new URL(request.url).pathname.replace(/^\/+/, "");
      let pathIsEncoded = options.pathIsEncoded;
      let requestKey;
      if (options.mapRequestToAsset) {
        requestKey = options.mapRequestToAsset(request);
      } else if (ASSET_MANIFEST[rawPathKey]) {
        requestKey = request;
      } else if (ASSET_MANIFEST[decodeURIComponent(rawPathKey)]) {
        pathIsEncoded = true;
        requestKey = request;
      } else {
        const mappedRequest = mapRequestToAsset(request);
        const mappedRawPathKey = new URL(mappedRequest.url).pathname.replace(/^\/+/, "");
        if (ASSET_MANIFEST[decodeURIComponent(mappedRawPathKey)]) {
          pathIsEncoded = true;
          requestKey = mappedRequest;
        } else {
          requestKey = mapRequestToAsset(request, options);
        }
      }
      const SUPPORTED_METHODS = ["GET", "HEAD"];
      if (!SUPPORTED_METHODS.includes(requestKey.method)) {
        throw new types_1.MethodNotAllowedError(`${requestKey.method} is not a valid request method`);
      }
      const parsedUrl = new URL(requestKey.url);
      const pathname = pathIsEncoded ? decodeURIComponent(parsedUrl.pathname) : parsedUrl.pathname;
      let pathKey = pathname.replace(/^\/+/, "");
      const cache = caches.default;
      let mimeType = mime.getType(pathKey) || options.defaultMimeType;
      if (mimeType.startsWith("text") || mimeType === "application/javascript") {
        mimeType += "; charset=utf-8";
      }
      let shouldEdgeCache = false;
      if (typeof ASSET_MANIFEST !== "undefined") {
        if (ASSET_MANIFEST[pathKey]) {
          pathKey = ASSET_MANIFEST[pathKey];
          shouldEdgeCache = true;
        }
      }
      const cacheKey = new Request(`${parsedUrl.origin}/${pathKey}`, request);
      const evalCacheOpts = (() => {
        switch (typeof options.cacheControl) {
          case "function":
            return options.cacheControl(request);
          case "object":
            return options.cacheControl;
          default:
            return defaultCacheControl;
        }
      })();
      const formatETag = /* @__PURE__ */ __name((entityId = pathKey, validatorType = options.defaultETag) => {
        if (!entityId) {
          return "";
        }
        switch (validatorType) {
          case "weak":
            if (!entityId.startsWith("W/")) {
              if (entityId.startsWith(`"`) && entityId.endsWith(`"`)) {
                return `W/${entityId}`;
              }
              return `W/"${entityId}"`;
            }
            return entityId;
          case "strong":
            if (entityId.startsWith(`W/"`)) {
              entityId = entityId.replace("W/", "");
            }
            if (!entityId.endsWith(`"`)) {
              entityId = `"${entityId}"`;
            }
            return entityId;
          default:
            return "";
        }
      }, "formatETag");
      options.cacheControl = Object.assign({}, defaultCacheControl, evalCacheOpts);
      if (options.cacheControl.bypassCache || options.cacheControl.edgeTTL === null || request.method == "HEAD") {
        shouldEdgeCache = false;
      }
      const shouldSetBrowserCache = typeof options.cacheControl.browserTTL === "number";
      let response = null;
      if (shouldEdgeCache) {
        response = await cache.match(cacheKey);
      }
      if (response) {
        if (response.status > 300 && response.status < 400) {
          if (response.body && "cancel" in Object.getPrototypeOf(response.body)) {
            response.body.cancel();
          } else {
          }
          response = new Response(null, response);
        } else {
          const opts = {
            headers: new Headers(response.headers),
            status: 0,
            statusText: ""
          };
          opts.headers.set("cf-cache-status", "HIT");
          if (response.status) {
            opts.status = response.status;
            opts.statusText = response.statusText;
          } else if (opts.headers.has("Content-Range")) {
            opts.status = 206;
            opts.statusText = "Partial Content";
          } else {
            opts.status = 200;
            opts.statusText = "OK";
          }
          response = new Response(response.body, opts);
        }
      } else {
        const body = await ASSET_NAMESPACE.get(pathKey, "arrayBuffer");
        if (body === null) {
          throw new types_1.NotFoundError(`could not find ${pathKey} in your content namespace`);
        }
        response = new Response(body);
        if (shouldEdgeCache) {
          response.headers.set("Accept-Ranges", "bytes");
          response.headers.set("Content-Length", String(body.byteLength));
          if (!response.headers.has("etag")) {
            response.headers.set("etag", formatETag(pathKey));
          }
          response.headers.set("Cache-Control", `max-age=${options.cacheControl.edgeTTL}`);
          event.waitUntil(cache.put(cacheKey, response.clone()));
          response.headers.set("CF-Cache-Status", "MISS");
        }
      }
      response.headers.set("Content-Type", mimeType);
      if (response.status === 304) {
        const etag = formatETag(response.headers.get("etag"));
        const ifNoneMatch = cacheKey.headers.get("if-none-match");
        const proxyCacheStatus = response.headers.get("CF-Cache-Status");
        if (etag) {
          if (ifNoneMatch && ifNoneMatch === etag && proxyCacheStatus === "MISS") {
            response.headers.set("CF-Cache-Status", "EXPIRED");
          } else {
            response.headers.set("CF-Cache-Status", "REVALIDATED");
          }
          response.headers.set("etag", formatETag(etag, "weak"));
        }
      }
      if (shouldSetBrowserCache) {
        response.headers.set("Cache-Control", `max-age=${options.cacheControl.browserTTL}`);
      } else {
        response.headers.delete("Cache-Control");
      }
      return response;
    }, "getAssetFromKV");
    exports.getAssetFromKV = getAssetFromKV2;
  }
});

// .wrangler/tmp/bundle-VpQHrK/middleware-loader.entry.ts
init_modules_watch_stub();

// .wrangler/tmp/bundle-VpQHrK/middleware-insertion-facade.js
init_modules_watch_stub();

// index.js
init_modules_watch_stub();
var import_kv_asset_handler = __toESM(require_dist());
import manifestJSON from "__STATIC_CONTENT_MANIFEST";
var assetManifest = JSON.parse(manifestJSON);
function bufToHex(buf) {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(bufToHex, "bufToHex");
function hexToBuf(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  return bytes.buffer;
}
__name(hexToBuf, "hexToBuf");
async function hashPassword(password, saltHex) {
  const enc = new TextEncoder();
  const salt = saltHex ? hexToBuf(saltHex) : crypto.getRandomValues(new Uint8Array(16)).buffer;
  const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 1e5, hash: "SHA-256" },
    keyMaterial,
    256
  );
  return { hash: bufToHex(bits), salt: bufToHex(salt) };
}
__name(hashPassword, "hashPassword");
async function hashArticleText(title, content) {
  const enc = new TextEncoder();
  const bits = await crypto.subtle.digest("SHA-256", enc.encode(`${title}\0${content}`));
  return bufToHex(bits);
}
__name(hashArticleText, "hashArticleText");
function timingSafeEqualStr(a, b) {
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}
__name(timingSafeEqualStr, "timingSafeEqualStr");
function securityHeaders(extraHeaders = {}) {
  return {
    "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' https://cdn.discordapp.com data:; connect-src 'self'; font-src 'self'; frame-ancestors 'none';",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
    ...extraHeaders
  };
}
__name(securityHeaders, "securityHeaders");
function secureJson(data, init = {}) {
  const res = Response.json(data, init);
  const headers = new Headers(res.headers);
  for (const [k, v] of Object.entries(securityHeaders())) headers.set(k, v);
  return new Response(res.body, { status: res.status, headers });
}
__name(secureJson, "secureJson");
async function sendEmail(env, { to, subject, html }) {
  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set \u2014 email skipped");
    return { ok: false, skipped: "RESEND_API_KEY not configured" };
  }
  if (!to) return { ok: false, skipped: "no recipient email" };
  const from = env.RESEND_FROM_EMAIL || "Jaronite News <ads@jaronitenews.com>";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ from, to, subject, html })
    });
    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", res.status, err);
      return { ok: false, error: `Resend API ${res.status}: ${err.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (e) {
    console.error("Resend fetch failed:", e);
    return { ok: false, error: `network error: ${e.message || e}` };
  }
}
__name(sendEmail, "sendEmail");
async function sendDiscordDm(env, discordUsername, message) {
  const token = env.DISCORD_BOT_TOKEN;
  if (!token) {
    console.warn("DISCORD_BOT_TOKEN not set \u2014 Discord DM skipped");
    return { ok: false, skipped: "DISCORD_BOT_TOKEN not configured" };
  }
  if (!discordUsername) return { ok: false, skipped: "no Discord username on file" };
  try {
    const username = discordUsername.replace(/#\d{4}$/, "").trim();
    const guildId = env.DISCORD_GUILD_ID;
    if (!guildId) {
      console.warn("DISCORD_GUILD_ID not set \u2014 Discord DM skipped");
      return { ok: false, skipped: "DISCORD_GUILD_ID not configured" };
    }
    const searchRes = await fetch(
      `https://discord.com/api/v10/guilds/${guildId}/members/search?query=${encodeURIComponent(username)}&limit=5`,
      { headers: { Authorization: `Bot ${token}` } }
    );
    if (!searchRes.ok) {
      const t = await searchRes.text();
      console.error("Discord member search failed:", searchRes.status, t);
      return { ok: false, error: `member search ${searchRes.status}: ${t.slice(0, 200)}` };
    }
    const members = await searchRes.json();
    const member = members.find(
      (m) => m.user.username.toLowerCase() === username.toLowerCase() || m.nick && m.nick.toLowerCase() === username.toLowerCase()
    ) || members[0];
    if (!member) {
      console.warn(`Discord: could not find user "${username}" in guild`);
      return { ok: false, error: `user "${username}" not found in the server` };
    }
    const userId = member.user.id;
    const dmRes = await fetch("https://discord.com/api/v10/users/@me/channels", {
      method: "POST",
      headers: { Authorization: `Bot ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ recipient_id: userId })
    });
    if (!dmRes.ok) {
      const t = await dmRes.text();
      console.error("Discord DM channel open failed:", dmRes.status, t);
      return { ok: false, error: `open DM ${dmRes.status}: ${t.slice(0, 200)}` };
    }
    const dmChannel = await dmRes.json();
    const msgRes = await fetch(`https://discord.com/api/v10/channels/${dmChannel.id}/messages`, {
      method: "POST",
      headers: { Authorization: `Bot ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ content: message })
    });
    if (!msgRes.ok) {
      const t = await msgRes.text();
      console.error("Discord message send failed:", msgRes.status, t);
      return { ok: false, error: `send message ${msgRes.status}: ${t.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (e) {
    console.error("Discord DM failed:", e);
    return { ok: false, error: `network error: ${e.message || e}` };
  }
}
__name(sendDiscordDm, "sendDiscordDm");
function winDiscordMsg(bid, slotLabel) {
  return `\u{1F389} **You won a Jaronite News ad slot!**

Hi **${bid.advertiser_name}** \u2014 your bid of **${Number(bid.bid_amount).toFixed(2)} \u2110/view** won the **${slotLabel}** slot for **${bid.target_date}**.

**How to pay:**
Send payment in-game to the Jaronite News firm account with this exact memo:
\`\`\`
bid:${bid.id}
\`\`\`
Include \`bid:${bid.id}\` in the memo/message so we match your payment automatically.

Questions? Reply here or contact us on the DemocracyCraft Discord.
\u2014 Jaronite News Inc.`;
}
__name(winDiscordMsg, "winDiscordMsg");
function confirmedDiscordMsg(bid, slotLabel, amount) {
  return `\u2705 **Payment received \u2014 your ad is confirmed!**

Hi **${bid.advertiser_name}** \u2014 we received your payment of **${Number(amount).toFixed(2)} \u2110** for bid **#${bid.id}** (${slotLabel}, ${bid.target_date}).

Your ad is confirmed and will run as scheduled. You'll receive a performance report after it runs.
\u2014 Jaronite News Inc.`;
}
__name(confirmedDiscordMsg, "confirmedDiscordMsg");
function reminderDiscordMsg(bid, slotLabel) {
  return `\u23F0 **Reminder: payment pending for your Jaronite News ad**

Hi **${bid.advertiser_name}** \u2014 your winning ad bid is still awaiting payment.

**Slot:** ${slotLabel}  
**Date:** ${bid.target_date}  
**Rate:** ${Number(bid.bid_amount).toFixed(2)} \u2110/view  
**Bid ID:** #${bid.id}

Pay in-game with memo \`bid:${bid.id}\` to the Jaronite News firm account. If payment isn't received before ${bid.target_date}, your slot may be forfeited.
\u2014 Jaronite News Inc.`;
}
__name(reminderDiscordMsg, "reminderDiscordMsg");
function winEmailHtml(bid, slotLabel) {
  const totalEstimate = (bid.bid_amount * 100).toFixed(2);
  return `
<div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#222;">
  <h2 style="color:#5b3fa0;">\u{1F389} You won an ad slot on Jaronite News!</h2>
  <p>Hi <strong>${bid.advertiser_name}</strong>,</p>
  <p>Your bid of <strong>${Number(bid.bid_amount).toFixed(2)} \u2110/view</strong> won the
     <strong>${slotLabel}</strong> slot for <strong>${bid.target_date}</strong>.</p>
  <h3 style="color:#5b3fa0;">How to pay</h3>
  <p>Transfer payment to the <strong>Jaronite News Inc.</strong> firm account in-game using:</p>
  <div style="background:#f3f0ff;border-left:4px solid #5b3fa0;padding:12px 16px;border-radius:4px;font-family:monospace;font-size:1.05em;">
    /pay JaroniteNews &lt;amount&gt; bid:${bid.id}
  </div>
  <p style="color:#666;font-size:0.9em;">
    Include <strong>bid:${bid.id}</strong> exactly as shown in the memo/message field so we can match your payment automatically.<br>
    You pay based on actual views \u2014 we'll send a final invoice after your ad runs.
  </p>
  <h3 style="color:#5b3fa0;">Your bid details</h3>
  <table style="width:100%;border-collapse:collapse;font-size:0.95em;">
    <tr><td style="padding:6px 0;color:#666;">Bid ID</td><td><strong>#${bid.id}</strong></td></tr>
    <tr><td style="padding:6px 0;color:#666;">Slot</td><td><strong>${slotLabel}</strong></td></tr>
    <tr><td style="padding:6px 0;color:#666;">Date</td><td><strong>${bid.target_date}</strong></td></tr>
    <tr><td style="padding:6px 0;color:#666;">Rate</td><td><strong>${Number(bid.bid_amount).toFixed(2)} \u2110/view</strong></td></tr>
  </table>
  <p style="margin-top:24px;color:#888;font-size:0.85em;">
    Questions? Reply to this email or contact us on Discord.<br>
    \u2014 Jaronite News Inc.
  </p>
</div>`;
}
__name(winEmailHtml, "winEmailHtml");
function paymentConfirmedEmailHtml(bid, slotLabel, amount) {
  return `
<div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#222;">
  <h2 style="color:#27ae60;">\u2705 Payment received \u2014 your ad is confirmed!</h2>
  <p>Hi <strong>${bid.advertiser_name}</strong>,</p>
  <p>We received your payment of <strong>${Number(amount).toFixed(2)} \u2110</strong> for bid <strong>#${bid.id}</strong>
     (${slotLabel}, ${bid.target_date}). Your ad is confirmed and will run as scheduled.</p>
  <p>After your ad runs you'll receive a performance report with impressions, clicks, and your final cost.</p>
  <p style="margin-top:24px;color:#888;font-size:0.85em;">\u2014 Jaronite News Inc.</p>
</div>`;
}
__name(paymentConfirmedEmailHtml, "paymentConfirmedEmailHtml");
function reminderEmailHtml(bid, slotLabel, daysUntilRun) {
  const runWindow = daysUntilRun > 0 ? `Your ad runs in <strong>${daysUntilRun} day${daysUntilRun === 1 ? "" : "s"}</strong> (${bid.target_date}), so please pay before then to keep your slot.` : `Your ad is scheduled to run today (${bid.target_date}) \u2014 please pay as soon as possible to keep your slot.`;
  return `
<div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#222;">
  <h2 style="color:#e67e22;">\u23F0 Reminder: payment pending for your ad slot</h2>
  <p>Hi <strong>${bid.advertiser_name}</strong>,</p>
  <p>This is a friendly reminder that payment for your winning ad bid is still outstanding. ${runWindow}</p>
  <div style="background:#fff8f0;border-left:4px solid #e67e22;padding:12px 16px;border-radius:4px;font-family:monospace;font-size:1.05em;">
    /pay JaroniteNews &lt;amount&gt; bid:${bid.id}
  </div>
  <p style="color:#666;font-size:0.9em;">
    Include <strong>bid:${bid.id}</strong> in the memo. If payment isn't received before your ad date (${bid.target_date}),
    your slot may be forfeited.
  </p>
  <table style="width:100%;border-collapse:collapse;font-size:0.95em;margin-top:12px;">
    <tr><td style="padding:6px 0;color:#666;">Bid ID</td><td><strong>#${bid.id}</strong></td></tr>
    <tr><td style="padding:6px 0;color:#666;">Slot</td><td><strong>${slotLabel}</strong></td></tr>
    <tr><td style="padding:6px 0;color:#666;">Date</td><td><strong>${bid.target_date}</strong></td></tr>
    <tr><td style="padding:6px 0;color:#666;">Rate</td><td><strong>${Number(bid.bid_amount).toFixed(2)} \u2110/view</strong></td></tr>
  </table>
  <p style="margin-top:24px;color:#888;font-size:0.85em;">\u2014 Jaronite News Inc.</p>
</div>`;
}
__name(reminderEmailHtml, "reminderEmailHtml");
var SLOT_LABELS = { 1: "Bottom Leaderboard (728\xD790)", 2: "Left Skyscraper (160\xD7600)", 3: "Right Skyscraper (160\xD7600)" };
var rateLimitStore = /* @__PURE__ */ new Map();
function isRateLimited(key, maxCalls, windowMs) {
  const now = Date.now();
  let entry = rateLimitStore.get(key);
  if (!entry || now - entry.windowStart > windowMs) {
    entry = { count: 1, windowStart: now };
    rateLimitStore.set(key, entry);
    return false;
  }
  entry.count++;
  if (entry.count > maxCalls) return true;
  return false;
}
__name(isRateLimited, "isRateLimited");
function pruneRateLimitStore(maxAgeMs = 6e4) {
  const cutoff = Date.now() - maxAgeMs;
  for (const [key, entry] of rateLimitStore) {
    if (entry.windowStart < cutoff) rateLimitStore.delete(key);
  }
}
__name(pruneRateLimitStore, "pruneRateLimitStore");
var VALID_CATEGORIES = /* @__PURE__ */ new Set(["politics", "economy", "guides", "miscellaneous"]);
var MAX_TITLE_LEN = 300;
var MAX_CONTENT_LEN = 1e5;
var MAX_COMMENT_LEN = 2e3;
var MAX_IMAGE_BYTES = 8e5;
function validateImageUrl(val, maxLen = MAX_IMAGE_BYTES) {
  if (!val) return null;
  if (typeof val !== "string") return null;
  if (!val.startsWith("data:image/")) return null;
  const allowed = ["data:image/jpeg;base64,", "data:image/jpg;base64,", "data:image/png;base64,", "data:image/gif;base64,", "data:image/webp;base64,"];
  if (!allowed.some((prefix) => val.startsWith(prefix))) return null;
  if (val.length > maxLen) return null;
  return val;
}
__name(validateImageUrl, "validateImageUrl");
var MAX_AD_IMAGE_BYTES = 115e4;
function validateHttpUrl(val, maxLen = 2048) {
  if (!val || typeof val !== "string") return null;
  const trimmed = val.trim();
  if (trimmed.length === 0 || trimmed.length > maxLen) return null;
  let parsed;
  try {
    parsed = new URL(trimmed);
  } catch {
    return null;
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
  if (!parsed.hostname) return null;
  return parsed.toString();
}
__name(validateHttpUrl, "validateHttpUrl");
async function verifyPassword(password, storedHash, storedSaltHex) {
  const { hash } = await hashPassword(password, storedSaltHex);
  if (hash.length !== storedHash.length) return false;
  let diff = 0;
  for (let i = 0; i < hash.length; i++) diff |= hash.charCodeAt(i) ^ storedHash.charCodeAt(i);
  return diff === 0;
}
__name(verifyPassword, "verifyPassword");
function newSessionToken() {
  return bufToHex(crypto.getRandomValues(new Uint8Array(32)).buffer);
}
__name(newSessionToken, "newSessionToken");
async function getSessionUser(env, request) {
  const authHeader = request.headers.get("Authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return null;
  const session = await env.DB.prepare(
    "SELECT username, expires_at FROM sessions WHERE token = ?"
  ).bind(token).first();
  if (!session) return null;
  if (new Date(session.expires_at) < /* @__PURE__ */ new Date()) return null;
  const user = await env.DB.prepare(
    "SELECT id, username, role, status FROM users WHERE username = ?"
  ).bind(session.username).first();
  if (!user || user.status !== "active") return null;
  const newExpiresAt = new Date(Date.now() + 1e3 * 60 * 20).toISOString();
  await env.DB.prepare("UPDATE sessions SET expires_at = ? WHERE token = ?").bind(newExpiresAt, token).run();
  return user;
}
__name(getSessionUser, "getSessionUser");
async function requireAdmin(env, request) {
  const user = await getSessionUser(env, request);
  if (!user || user.role !== "admin") return null;
  return user;
}
__name(requireAdmin, "requireAdmin");
async function requireEditorOrAdmin(env, request) {
  const user = await getSessionUser(env, request);
  if (!user || user.role !== "editor" && user.role !== "admin") return null;
  return user;
}
__name(requireEditorOrAdmin, "requireEditorOrAdmin");
async function getDiscordSessionUser(env, request) {
  const authHeader = request.headers.get("Authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return null;
  const session = await env.DB.prepare(
    "SELECT discord_user_id, expires_at FROM discord_sessions WHERE token = ?"
  ).bind(token).first();
  if (!session) return null;
  if (new Date(session.expires_at) < /* @__PURE__ */ new Date()) return null;
  const user = await env.DB.prepare(
    "SELECT id, discord_id, username, avatar_hash, status FROM discord_users WHERE id = ?"
  ).bind(session.discord_user_id).first();
  if (!user || user.status !== "active") return null;
  const newExpiresAt = new Date(Date.now() + 1e3 * 60 * 60 * 24 * 30).toISOString();
  await env.DB.prepare("UPDATE discord_sessions SET expires_at = ? WHERE token = ?").bind(newExpiresAt, token).run();
  return user;
}
__name(getDiscordSessionUser, "getDiscordSessionUser");
async function log(env, username, action, details = "") {
  await env.DB.prepare("INSERT INTO logs (username, action, details) VALUES (?, ?, ?)").bind(username, action, details).run();
}
__name(log, "log");
function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/[\s-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}
__name(slugify, "slugify");
function parseUserAgent(ua) {
  const s = ua || "";
  let deviceType = "desktop";
  if (/tablet|ipad/i.test(s)) deviceType = "tablet";
  else if (/mobile|android|iphone/i.test(s)) deviceType = "mobile";
  let browser = "Other";
  if (/edg\//i.test(s)) browser = "Edge";
  else if (/opr\/|opera/i.test(s)) browser = "Opera";
  else if (/chrome\//i.test(s)) browser = "Chrome";
  else if (/firefox\//i.test(s)) browser = "Firefox";
  else if (/safari\//i.test(s) && !/chrome/i.test(s)) browser = "Safari";
  let os = "Other";
  if (/windows/i.test(s)) os = "Windows";
  else if (/mac os|macintosh/i.test(s)) os = "macOS";
  else if (/android/i.test(s)) os = "Android";
  else if (/iphone|ipad|ios/i.test(s)) os = "iOS";
  else if (/linux/i.test(s)) os = "Linux";
  return { deviceType, browser, os };
}
__name(parseUserAgent, "parseUserAgent");
var index_default = {
  /**
   * Single entry point for the whole Worker. Every HTTP request — API calls
   * and static asset requests alike — comes through here. Routes are matched
   * by exact pathname + method against a flat if-chain; the first match wins
   * and returns. Anything that doesn't match an /api/* route falls through
   * to static asset serving at the bottom (the public site + portal HTML/CSS),
   * which also handles clean URLs (e.g. /portal -> portal.html).
   *
   * Route reference (all POST unless noted):
   *  PUBLIC (no auth required)
   *   - POST /api/login                    Authenticate, issue a session token.
   *   - POST /api/logout                   Invalidate the caller's session token.
   *   - GET  /api/articles?category=...    List published articles in a category (public site).
   *   - GET  /api/article-hash?id=...      Lightweight integrity hash for one published article (powers client-side tamper/update detection).
   *   - GET  /api/article/:id-slug         Fetch one published article by its id-slug (e.g. /api/article/1-mayoral-election). Used by the /article/* page renderer.
   *   - GET  /api/auth/discord/login       Redirect to Discord's OAuth2 consent screen.
   *   - GET  /api/auth/discord/callback    Discord redirects here with a code; exchanges it, upserts the reader, issues a session.
   *   - GET  /api/auth/discord/me          Resolve the caller's Discord session, if any.
   *   - GET  /api/comments?article_id=...  List visible comments on an article.
   *   - GET  /api/favorites/check          (used with reader token) which of a set of article IDs the caller has favorited.
   *   - POST /api/analytics/view           Record one article view (called on article open).
   *   - POST /api/analytics/ping           Heartbeat: update read time + scroll depth for an open view.
   *
   *  AUTH'D DISCORD READER (Bearer = discord session token)
   *   - POST /api/auth/discord/logout      Invalidate the caller's Discord session token.
   *   - POST /api/comments                 Post a comment on a published article.
   *   - POST /api/comments/delete          Soft-delete the caller's own comment.
   *   - GET  /api/favorites                List the caller's favorited articles (full objects).
   *   - POST /api/favorites/toggle         Favorite/unfavorite an article.
   *
   *  ANY AUTHENTICATED STAFF USER
   *   - POST /api/articles                 Submit a new article for review (always starts pending_review).
   *   - POST /api/article-detail           Fetch one article's full detail (writers: own only; editors/admins: any).
   *   - POST /api/my-articles              List the caller's own submitted articles + status.
   *   - POST /api/my-articles/resubmit     Resubmit a 'returned' article with revisions.
   *   - POST /api/analytics/article        Full analytics dashboard for one article (writers: own only; editors/admins: any).
   *   - POST /api/analytics/summary        Views summary across the caller's articles (editors/admins can pass site_wide:true or target_username).
   *
   *  EDITOR or ADMIN
   *   - POST /api/articles/instapublish    Publish an article immediately, skipping review.
   *   - POST /api/editor/pending           List the open pending_review queue.
   *   - POST /api/editor/claim             Claim a pending article for review.
   *   - POST /api/editor/my-claims         List articles claimed by the caller.
   *   - POST /api/editor/approve           Approve a claimed/returned article -> published.
   *   - POST /api/editor/return            Return a claimed article to its writer with notes.
   *   - POST /api/editor/deny              Permanently deny a claimed/returned article.
   *
   *  ADMIN ONLY
   *   - POST /api/admin/all-claimed        List every claimed/returned article system-wide.
   *   - POST /api/admin/steal-claim        Reassign any in-progress article to the caller.
   *   - POST /api/admin/articles           List all articles, optionally filtered by status.
   *   - POST /api/admin/edit               Edit a published article's title/content.
   *   - POST /api/admin/censor             Toggle a published article's censored state.
   *   - POST /api/admin/delete             Permanently delete an article.
   *   - POST /api/admin/users              List all user accounts.
   *   - POST /api/admin/user-detail        Fetch one user's profile + article count.
   *   - POST /api/admin/user-history       Fetch one user's full audit-log history.
   *   - POST /api/admin/create-user        Create a new user account.
   *   - POST /api/admin/change-role        Change a user's role (writer/editor/admin).
   *   - POST /api/admin/set-status         Suspend or reactivate a user account.
   *   - POST /api/admin/reset-password     Set a new password for a user.
   *   - POST /api/admin/delete-user        Permanently delete a user account.
   *   - POST /api/admin/logs               Fetch the global audit log.
   *
   *  FALLTHROUGH
   *   - *                                  Serve static assets (HTML/CSS/JS/images) from KV, with clean-URL rewriting.
   *
   * @param {Request} request - The incoming HTTP request.
   * @param {object} env - Worker environment bindings (env.DB is the D1 database, env.__STATIC_CONTENT is the asset bucket).
   * @param {ExecutionContext} ctx - Cloudflare execution context, used to extend the worker's lifetime for async KV asset fetches.
   * @returns {Promise<Response>} The HTTP response for this request.
   */
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const clientIp = request.headers.get("CF-Connecting-IP") || "unknown";
    if (url.pathname === "/api/login" && request.method === "POST") {
      pruneRateLimitStore();
      if (isRateLimited(`login:${clientIp}`, 10, 6e4)) {
        return secureJson({ success: false, error: "Too many login attempts \u2014 try again in a minute." }, { status: 429 });
      }
      const { username, password } = await request.json();
      if (!username || !password) return secureJson({ success: false }, { status: 400 });
      const user = await env.DB.prepare(
        "SELECT * FROM users WHERE username = ?"
      ).bind(username).first();
      const ok = user && user.status === "active" && await verifyPassword(password, user.password, user.password_salt);
      if (ok) {
        const token = newSessionToken();
        const expiresAt = new Date(Date.now() + 1e3 * 60 * 20).toISOString();
        await env.DB.prepare(
          "INSERT INTO sessions (token, username, expires_at) VALUES (?, ?, ?)"
        ).bind(token, user.username, expiresAt).run();
        await env.DB.prepare("UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE username = ?").bind(user.username).run();
        await log(env, username, "LOGIN", "Logged into employee portal");
        return secureJson({ success: true, token, user: { username: user.username, role: user.role } });
      }
      await log(env, username, "FAILED_LOGIN", "Failed login attempt");
      return secureJson({ success: false });
    }
    if (url.pathname === "/api/logout" && request.method === "POST") {
      const authHeader = request.headers.get("Authorization") || "";
      const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
      if (token) await env.DB.prepare("DELETE FROM sessions WHERE token = ?").bind(token).run();
      return secureJson({ success: true });
    }
    if (url.pathname === "/api/auth/discord/login" && request.method === "GET") {
      const state = url.searchParams.get("state") || "";
      const redirectUri = `${url.origin}/api/auth/discord/callback`;
      const discordUrl = new URL("https://discord.com/oauth2/authorize");
      discordUrl.searchParams.set("client_id", env.DISCORD_CLIENT_ID);
      discordUrl.searchParams.set("redirect_uri", redirectUri);
      discordUrl.searchParams.set("response_type", "code");
      discordUrl.searchParams.set("scope", "identify");
      discordUrl.searchParams.set("state", state);
      discordUrl.searchParams.set("prompt", "consent");
      return Response.redirect(discordUrl.toString(), 302);
    }
    if (url.pathname === "/api/auth/discord/callback" && request.method === "GET") {
      pruneRateLimitStore();
      if (isRateLimited(`discord_cb:${clientIp}`, 20, 6e4)) {
        return Response.redirect(`${url.origin}/?discord_error=rate_limited`, 302);
      }
      const code = url.searchParams.get("code");
      const state = url.searchParams.get("state") || "";
      if (!code) return Response.redirect(`${url.origin}/?discord_error=missing_code`, 302);
      const redirectUri = `${url.origin}/api/auth/discord/callback`;
      let tokenData;
      try {
        const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id: env.DISCORD_CLIENT_ID,
            client_secret: env.DISCORD_CLIENT_SECRET,
            grant_type: "authorization_code",
            code,
            redirect_uri: redirectUri
          }).toString()
        });
        tokenData = await tokenRes.json();
        if (!tokenData.access_token) throw new Error("No access token in response");
      } catch (e) {
        return Response.redirect(`${url.origin}/?discord_error=token_exchange_failed`, 302);
      }
      let discordProfile;
      try {
        const profileRes = await fetch("https://discord.com/api/users/@me", {
          headers: { Authorization: `Bearer ${tokenData.access_token}` }
        });
        discordProfile = await profileRes.json();
        if (!discordProfile.id) throw new Error("No id in profile response");
      } catch (e) {
        return Response.redirect(`${url.origin}/?discord_error=profile_fetch_failed`, 302);
      }
      const displayName = discordProfile.global_name || discordProfile.username;
      const existing = await env.DB.prepare(
        "SELECT id FROM discord_users WHERE discord_id = ?"
      ).bind(discordProfile.id).first();
      let discordUserId;
      if (existing) {
        discordUserId = existing.id;
        await env.DB.prepare(
          "UPDATE discord_users SET username = ?, avatar_hash = ?, last_login_at = CURRENT_TIMESTAMP WHERE id = ?"
        ).bind(displayName, discordProfile.avatar || null, discordUserId).run();
      } else {
        const inserted = await env.DB.prepare(
          "INSERT INTO discord_users (discord_id, username, avatar_hash, last_login_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)"
        ).bind(discordProfile.id, displayName, discordProfile.avatar || null).run();
        discordUserId = inserted.meta.last_row_id;
      }
      const banCheck = await env.DB.prepare("SELECT status FROM discord_users WHERE id = ?").bind(discordUserId).first();
      if (banCheck.status !== "active") {
        return Response.redirect(`${url.origin}/?discord_error=banned`, 302);
      }
      const sessionToken = newSessionToken();
      const expiresAt = new Date(Date.now() + 1e3 * 60 * 60 * 24 * 30).toISOString();
      await env.DB.prepare(
        "INSERT INTO discord_sessions (token, discord_user_id, expires_at) VALUES (?, ?, ?)"
      ).bind(sessionToken, discordUserId, expiresAt).run();
      const redirectBack = new URL(url.origin + "/");
      redirectBack.hash = `discord_token=${sessionToken}&state=${encodeURIComponent(state)}`;
      return Response.redirect(redirectBack.toString(), 302);
    }
    if (url.pathname === "/api/auth/discord/me" && request.method === "GET") {
      const reader = await getDiscordSessionUser(env, request);
      if (!reader) return secureJson({ loggedIn: false });
      return secureJson({
        loggedIn: true,
        username: reader.username,
        avatarUrl: reader.avatar_hash ? `https://cdn.discordapp.com/avatars/${reader.discord_id}/${reader.avatar_hash}.png` : null
      });
    }
    if (url.pathname === "/api/auth/discord/logout" && request.method === "POST") {
      const authHeader = request.headers.get("Authorization") || "";
      const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
      if (token) await env.DB.prepare("DELETE FROM discord_sessions WHERE token = ?").bind(token).run();
      return secureJson({ success: true });
    }
    if (url.pathname === "/api/comments" && request.method === "GET") {
      const articleId = url.searchParams.get("article_id");
      if (!articleId) return secureJson({ error: "Missing article_id" }, { status: 400 });
      const results = await env.DB.prepare(
        `SELECT comments.id, comments.content, comments.created_at, discord_users.username, discord_users.avatar_hash, discord_users.discord_id
         FROM comments JOIN discord_users ON comments.discord_user_id = discord_users.id
         WHERE comments.article_id = ? AND comments.status = 'visible'
         ORDER BY comments.created_at ASC`
      ).bind(articleId).all();
      const comments = results.results.map((c) => ({
        id: c.id,
        content: c.content,
        created_at: c.created_at,
        username: c.username,
        avatarUrl: c.avatar_hash ? `https://cdn.discordapp.com/avatars/${c.discord_id}/${c.avatar_hash}.png` : null
      }));
      return secureJson(comments);
    }
    if (url.pathname === "/api/comments" && request.method === "POST") {
      const reader = await getDiscordSessionUser(env, request);
      if (!reader) return secureJson({ error: "Unauthorized" }, { status: 401 });
      pruneRateLimitStore();
      if (isRateLimited(`comment:${reader.id}`, 5, 6e4)) {
        return secureJson({ error: "You're posting too fast \u2014 please wait a moment." }, { status: 429 });
      }
      const { article_id, content } = await request.json();
      const trimmed = (content || "").trim();
      if (!trimmed) return secureJson({ error: "Comment cannot be empty" }, { status: 400 });
      if (trimmed.length > MAX_COMMENT_LEN) return secureJson({ error: `Comment is too long (${MAX_COMMENT_LEN} character max)` }, { status: 400 });
      const articleIdInt = parseInt(article_id, 10);
      if (!articleIdInt || isNaN(articleIdInt)) return secureJson({ error: "Invalid article" }, { status: 400 });
      const article = await env.DB.prepare("SELECT id FROM articles WHERE id = ? AND status = 'published'").bind(articleIdInt).first();
      if (!article) return secureJson({ error: "Article not found" }, { status: 404 });
      await env.DB.prepare(
        "INSERT INTO comments (article_id, discord_user_id, content) VALUES (?, ?, ?)"
      ).bind(articleIdInt, reader.id, trimmed).run();
      return secureJson({ success: true });
    }
    if (url.pathname === "/api/comments/delete" && request.method === "POST") {
      const reader = await getDiscordSessionUser(env, request);
      if (!reader) return secureJson({ error: "Unauthorized" }, { status: 401 });
      const { comment_id } = await request.json();
      const comment = await env.DB.prepare("SELECT discord_user_id FROM comments WHERE id = ?").bind(comment_id).first();
      if (!comment || comment.discord_user_id !== reader.id) {
        return secureJson({ error: "Not found or not yours" }, { status: 404 });
      }
      await env.DB.prepare("UPDATE comments SET status = 'removed' WHERE id = ?").bind(comment_id).run();
      return secureJson({ success: true });
    }
    if (url.pathname === "/api/favorites" && request.method === "GET") {
      const reader = await getDiscordSessionUser(env, request);
      if (!reader) return secureJson({ error: "Unauthorized" }, { status: 401 });
      const results = await env.DB.prepare(
        `SELECT articles.id, articles.title, articles.category, articles.author, articles.created_at, favorites.created_at as favorited_at
         FROM favorites JOIN articles ON favorites.article_id = articles.id
         WHERE favorites.discord_user_id = ? AND articles.status = 'published'
         ORDER BY favorites.created_at DESC`
      ).bind(reader.id).all();
      return secureJson(results.results);
    }
    if (url.pathname === "/api/favorites/toggle" && request.method === "POST") {
      const reader = await getDiscordSessionUser(env, request);
      if (!reader) return secureJson({ error: "Unauthorized" }, { status: 401 });
      const { article_id } = await request.json();
      const existing = await env.DB.prepare(
        "SELECT id FROM favorites WHERE discord_user_id = ? AND article_id = ?"
      ).bind(reader.id, article_id).first();
      if (existing) {
        await env.DB.prepare("DELETE FROM favorites WHERE id = ?").bind(existing.id).run();
        return secureJson({ favorited: false });
      } else {
        await env.DB.prepare(
          "INSERT INTO favorites (discord_user_id, article_id) VALUES (?, ?)"
        ).bind(reader.id, article_id).run();
        return secureJson({ favorited: true });
      }
    }
    if (url.pathname === "/api/favorites/check" && request.method === "POST") {
      const reader = await getDiscordSessionUser(env, request);
      if (!reader) return secureJson({ favorited: [] });
      const { article_ids } = await request.json();
      if (!Array.isArray(article_ids) || article_ids.length === 0) return secureJson({ favorited: [] });
      const placeholders = article_ids.map(() => "?").join(",");
      const results = await env.DB.prepare(
        `SELECT article_id FROM favorites WHERE discord_user_id = ? AND article_id IN (${placeholders})`
      ).bind(reader.id, ...article_ids).all();
      return secureJson({ favorited: results.results.map((r) => r.article_id) });
    }
    if (url.pathname === "/api/analytics/view" && request.method === "POST") {
      const { article_id, visitor_id, referrer } = await request.json();
      if (!article_id || !visitor_id) return secureJson({ error: "Missing fields" }, { status: 400 });
      const article = await env.DB.prepare("SELECT id FROM articles WHERE id = ? AND status = 'published'").bind(article_id).first();
      if (!article) return secureJson({ error: "Not found" }, { status: 404 });
      const ua = request.headers.get("User-Agent") || "";
      const { deviceType, browser, os } = parseUserAgent(ua);
      let referrerDomain = null;
      if (referrer) {
        try {
          referrerDomain = new URL(referrer).hostname;
        } catch (e) {
          referrerDomain = null;
        }
      }
      const reader = await getDiscordSessionUser(env, request);
      const inserted = await env.DB.prepare(
        `INSERT INTO page_views (article_id, visitor_id, referrer, referrer_domain, user_agent, device_type, browser, os, is_discord_user)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(article_id, visitor_id, referrer || "", referrerDomain, ua, deviceType, browser, os, reader ? 1 : 0).run();
      return secureJson({ success: true, view_id: inserted.meta.last_row_id });
    }
    if (url.pathname === "/api/analytics/ping" && request.method === "POST") {
      const { view_id, read_seconds, max_scroll_pct } = await request.json();
      const viewId = parseInt(view_id, 10);
      if (!viewId || isNaN(viewId)) return secureJson({ error: "Missing view_id" }, { status: 400 });
      let secs = Math.floor(Number(read_seconds));
      let scroll = Math.floor(Number(max_scroll_pct));
      if (!Number.isFinite(secs) || secs < 0) secs = 0;
      if (secs > 86400) secs = 86400;
      if (!Number.isFinite(scroll) || scroll < 0) scroll = 0;
      if (scroll > 100) scroll = 100;
      await env.DB.prepare(
        "UPDATE page_views SET read_seconds = MAX(read_seconds, ?), max_scroll_pct = MAX(max_scroll_pct, ?) WHERE id = ?"
      ).bind(secs, scroll, viewId).run();
      return secureJson({ success: true });
    }
    if (url.pathname === "/api/analytics/article" && request.method === "POST") {
      const user = await getSessionUser(env, request);
      if (!user) return secureJson({ error: "Unauthorized" }, { status: 401 });
      const { article_id } = await request.json();
      const article = await env.DB.prepare("SELECT id, title, author FROM articles WHERE id = ?").bind(article_id).first();
      if (!article) return secureJson({ error: "Not found" }, { status: 404 });
      if (article.author !== user.username && user.role !== "editor" && user.role !== "admin") {
        return secureJson({ error: "Unauthorized" }, { status: 403 });
      }
      const totals = await env.DB.prepare(
        `SELECT COUNT(*) as total_views, COUNT(DISTINCT visitor_id) as unique_visitors,
                AVG(read_seconds) as avg_read_seconds, AVG(max_scroll_pct) as avg_scroll_pct,
                SUM(is_discord_user) as discord_views
         FROM page_views WHERE article_id = ?`
      ).bind(article_id).first();
      const dailySeries = await env.DB.prepare(
        `SELECT DATE(created_at) as day, COUNT(*) as views, COUNT(DISTINCT visitor_id) as unique_visitors
         FROM page_views WHERE article_id = ? GROUP BY DATE(created_at) ORDER BY day ASC`
      ).bind(article_id).all();
      const referrers = await env.DB.prepare(
        `SELECT COALESCE(NULLIF(referrer_domain, ''), 'Direct / Unknown') as source, COUNT(*) as views
         FROM page_views WHERE article_id = ? GROUP BY source ORDER BY views DESC LIMIT 15`
      ).bind(article_id).all();
      const devices = await env.DB.prepare(
        `SELECT device_type, COUNT(*) as views FROM page_views WHERE article_id = ? GROUP BY device_type ORDER BY views DESC`
      ).bind(article_id).all();
      const browsers = await env.DB.prepare(
        `SELECT browser, COUNT(*) as views FROM page_views WHERE article_id = ? GROUP BY browser ORDER BY views DESC`
      ).bind(article_id).all();
      const osBreakdown = await env.DB.prepare(
        `SELECT os, COUNT(*) as views FROM page_views WHERE article_id = ? GROUP BY os ORDER BY views DESC`
      ).bind(article_id).all();
      const readDepthBuckets = await env.DB.prepare(
        `SELECT
           SUM(CASE WHEN max_scroll_pct < 25 THEN 1 ELSE 0 END) as bucket_0_25,
           SUM(CASE WHEN max_scroll_pct >= 25 AND max_scroll_pct < 50 THEN 1 ELSE 0 END) as bucket_25_50,
           SUM(CASE WHEN max_scroll_pct >= 50 AND max_scroll_pct < 75 THEN 1 ELSE 0 END) as bucket_50_75,
           SUM(CASE WHEN max_scroll_pct >= 75 THEN 1 ELSE 0 END) as bucket_75_100
         FROM page_views WHERE article_id = ?`
      ).bind(article_id).first();
      return secureJson({
        article: { id: article.id, title: article.title },
        totals: {
          total_views: totals.total_views || 0,
          unique_visitors: totals.unique_visitors || 0,
          avg_read_seconds: Math.round(totals.avg_read_seconds || 0),
          avg_scroll_pct: Math.round(totals.avg_scroll_pct || 0),
          discord_views: totals.discord_views || 0
        },
        daily_series: dailySeries.results,
        referrers: referrers.results,
        devices: devices.results,
        browsers: browsers.results,
        os: osBreakdown.results,
        read_depth: readDepthBuckets
      });
    }
    if (url.pathname === "/api/analytics/summary" && request.method === "POST") {
      const user = await getSessionUser(env, request);
      if (!user) return secureJson({ error: "Unauthorized" }, { status: 401 });
      const body = await request.json().catch(() => ({}));
      let targetUsername = user.username;
      if (body.target_username && (user.role === "editor" || user.role === "admin")) {
        targetUsername = body.target_username;
      }
      const siteWide = (user.role === "editor" || user.role === "admin") && body.site_wide === true;
      const query = siteWide ? `SELECT articles.id, articles.title, articles.category, articles.author, articles.created_at,
                  COUNT(page_views.id) as total_views, COUNT(DISTINCT page_views.visitor_id) as unique_visitors,
                  AVG(page_views.read_seconds) as avg_read_seconds
           FROM articles LEFT JOIN page_views ON page_views.article_id = articles.id
           WHERE articles.status = 'published'
           GROUP BY articles.id ORDER BY total_views DESC` : `SELECT articles.id, articles.title, articles.category, articles.author, articles.created_at,
                  COUNT(page_views.id) as total_views, COUNT(DISTINCT page_views.visitor_id) as unique_visitors,
                  AVG(page_views.read_seconds) as avg_read_seconds
           FROM articles LEFT JOIN page_views ON page_views.article_id = articles.id
           WHERE articles.status = 'published' AND articles.author = ?
           GROUP BY articles.id ORDER BY total_views DESC`;
      const results = siteWide ? await env.DB.prepare(query).all() : await env.DB.prepare(query).bind(targetUsername).all();
      const rows = results.results.map((r) => ({
        ...r,
        avg_read_seconds: Math.round(r.avg_read_seconds || 0)
      }));
      return secureJson(rows);
    }
    if (url.pathname === "/api/articles" && request.method === "POST") {
      const user = await getSessionUser(env, request);
      if (!user) return secureJson({ error: "Unauthorized" }, { status: 401 });
      const { title, category, content, image_url: imageUrlRaw } = await request.json();
      if (!title || !title.trim()) return secureJson({ error: "Title is required." }, { status: 400 });
      if (!content || !content.trim()) return secureJson({ error: "Content is required." }, { status: 400 });
      if (!VALID_CATEGORIES.has(category)) return secureJson({ error: "Invalid category." }, { status: 400 });
      if (title.trim().length > MAX_TITLE_LEN) return secureJson({ error: `Title must be under ${MAX_TITLE_LEN} characters.` }, { status: 400 });
      if (content.trim().length > MAX_CONTENT_LEN) return secureJson({ error: `Content must be under ${MAX_CONTENT_LEN} characters.` }, { status: 400 });
      const imageUrl = validateImageUrl(imageUrlRaw);
      if (imageUrlRaw && !imageUrl) return secureJson({ error: "Invalid or oversized image (max ~600 KB, JPEG/PNG/WebP/GIF only)." }, { status: 400 });
      await env.DB.prepare(
        "INSERT INTO articles (title, category, content, author, status, image_url) VALUES (?, ?, ?, ?, 'pending_review', ?)"
      ).bind(title.trim(), category, content.trim(), user.username, imageUrl).run();
      await log(env, user.username, "POST_ARTICLE", `Submitted article "${title.trim()}" in category "${category}" for review`);
      return secureJson({ success: true });
    }
    if (url.pathname === "/api/articles/instapublish" && request.method === "POST") {
      const user = await requireEditorOrAdmin(env, request);
      if (!user) return secureJson({ error: "Unauthorized" }, { status: 403 });
      const { title, category, content, image_url: imageUrlRaw } = await request.json();
      if (!title || !content || !category) {
        return secureJson({ error: "Title, category, and content are all required." }, { status: 400 });
      }
      if (!VALID_CATEGORIES.has(category)) return secureJson({ error: "Invalid category." }, { status: 400 });
      if (title.trim().length > MAX_TITLE_LEN) return secureJson({ error: `Title must be under ${MAX_TITLE_LEN} characters.` }, { status: 400 });
      if (content.trim().length > MAX_CONTENT_LEN) return secureJson({ error: `Content must be under ${MAX_CONTENT_LEN} characters.` }, { status: 400 });
      const imageUrl = validateImageUrl(imageUrlRaw);
      if (imageUrlRaw && !imageUrl) return secureJson({ error: "Invalid or oversized image (max ~600 KB, JPEG/PNG/WebP/GIF only)." }, { status: 400 });
      await env.DB.prepare(
        "INSERT INTO articles (title, category, content, author, status, image_url) VALUES (?, ?, ?, ?, 'published', ?)"
      ).bind(title.trim(), category, content.trim(), user.username, imageUrl).run();
      await log(env, user.username, "INSTAPUBLISH_ARTICLE", `Published article "${title.trim()}" in category "${category}" directly, bypassing review`);
      return secureJson({ success: true });
    }
    if (url.pathname === "/api/articles" && request.method === "GET") {
      const category = url.searchParams.get("category");
      if (!VALID_CATEGORIES.has(category)) return secureJson([], { status: 200 });
      const results = await env.DB.prepare(
        "SELECT * FROM articles WHERE category = ? AND status = 'published' ORDER BY created_at DESC"
      ).bind(category).all();
      const articles = results.results.map((a) => ({
        ...a,
        slug: `${a.id}-${slugify(a.title)}`
      }));
      return secureJson(articles);
    }
    if (url.pathname === "/api/articles/all" && request.method === "GET") {
      pruneRateLimitStore();
      if (isRateLimited(`articles_all:${clientIp}`, 30, 6e4)) {
        return secureJson({ error: "Too many requests" }, { status: 429 });
      }
      const results = await env.DB.prepare(
        "SELECT * FROM articles WHERE status = 'published' ORDER BY created_at DESC"
      ).all();
      const articles = results.results.map((a) => ({
        ...a,
        slug: `${a.id}-${slugify(a.title)}`
      }));
      return secureJson(articles);
    }
    if (url.pathname.startsWith("/api/article/") && request.method === "GET") {
      const param = url.pathname.slice("/api/article/".length);
      const id = parseInt(param.split("-")[0], 10);
      if (!id || isNaN(id)) return secureJson({ error: "Not found" }, { status: 404 });
      const article = await env.DB.prepare(
        "SELECT * FROM articles WHERE id = ? AND status = 'published'"
      ).bind(id).first();
      if (!article) return secureJson({ error: "Not found" }, { status: 404 });
      return secureJson({ ...article, slug: `${article.id}-${slugify(article.title)}` });
    }
    if (url.pathname === "/api/article-hash" && request.method === "GET") {
      const id = url.searchParams.get("id");
      if (!id) return secureJson({ error: "Missing id" }, { status: 400 });
      const article = await env.DB.prepare(
        "SELECT title, content FROM articles WHERE id = ? AND status = 'published'"
      ).bind(id).first();
      if (!article) return secureJson({ exists: false });
      const hash = await hashArticleText(article.title, article.content);
      return secureJson({ exists: true, hash });
    }
    if (url.pathname === "/api/article-detail" && request.method === "POST") {
      const user = await getSessionUser(env, request);
      if (!user) return secureJson({ error: "Unauthorized" }, { status: 401 });
      const { id } = await request.json();
      const article = await env.DB.prepare("SELECT * FROM articles WHERE id = ?").bind(id).first();
      if (!article) return secureJson({ error: "Not found" }, { status: 404 });
      const isPrivileged = user.role === "editor" || user.role === "admin";
      if (!isPrivileged && article.author !== user.username) {
        return secureJson({ error: "Unauthorized" }, { status: 403 });
      }
      return secureJson(article);
    }
    if (url.pathname === "/api/my-articles" && request.method === "POST") {
      const user = await getSessionUser(env, request);
      if (!user) return secureJson({ error: "Unauthorized" }, { status: 401 });
      const results = await env.DB.prepare(
        "SELECT id, title, category, content, status, claimed_by, review_notes, created_at, updated_at FROM articles WHERE author = ? ORDER BY updated_at DESC"
      ).bind(user.username).all();
      return secureJson(results.results);
    }
    if (url.pathname === "/api/my-articles/resubmit" && request.method === "POST") {
      const user = await getSessionUser(env, request);
      if (!user) return secureJson({ error: "Unauthorized" }, { status: 401 });
      const { id, title, content, image_url: imageUrlRaw, remove_image } = await request.json();
      const article = await env.DB.prepare(
        "SELECT * FROM articles WHERE id = ? AND author = ?"
      ).bind(id, user.username).first();
      if (!article) return secureJson({ error: "Not found" }, { status: 404 });
      if (article.status !== "returned") {
        return secureJson({ error: "This article isn't awaiting revision." }, { status: 400 });
      }
      let imageUpdateSql = "";
      let imageUpdateVal = void 0;
      if (remove_image) {
        imageUpdateSql = ", image_url = NULL";
      } else if (imageUrlRaw !== void 0) {
        const imageUrl = validateImageUrl(imageUrlRaw);
        if (imageUrlRaw && !imageUrl) return secureJson({ error: "Invalid or oversized image." }, { status: 400 });
        imageUpdateSql = ", image_url = ?";
        imageUpdateVal = imageUrl;
      }
      const resubSql = `UPDATE articles SET title = ?, content = ?${imageUpdateSql}, status = 'claimed', review_notes = NULL, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
      const resubBinds = imageUpdateVal !== void 0 ? [title, content, imageUpdateVal, id] : [title, content, id];
      await env.DB.prepare(resubSql).bind(...resubBinds).run();
      await log(env, user.username, "RESUBMIT_ARTICLE", `Resubmitted article "${title}" (ID ${id}) to ${article.claimed_by} after revision`);
      return secureJson({ success: true });
    }
    if (url.pathname === "/api/editor/pending" && request.method === "POST") {
      const reviewer = await requireEditorOrAdmin(env, request);
      if (!reviewer) return secureJson({ error: "Unauthorized" }, { status: 403 });
      const results = await env.DB.prepare(
        "SELECT id, title, category, author, status, created_at FROM articles WHERE status = 'pending_review' ORDER BY created_at ASC"
      ).all();
      return secureJson(results.results);
    }
    if (url.pathname === "/api/editor/claim" && request.method === "POST") {
      const reviewer = await requireEditorOrAdmin(env, request);
      if (!reviewer) return secureJson({ error: "Unauthorized" }, { status: 403 });
      const { id } = await request.json();
      const article = await env.DB.prepare("SELECT * FROM articles WHERE id = ?").bind(id).first();
      if (!article) return secureJson({ error: "Not found" }, { status: 404 });
      if (article.status !== "pending_review") {
        return secureJson({ error: "This article has already been claimed or is no longer pending." }, { status: 409 });
      }
      const claimRes = await env.DB.prepare(
        "UPDATE articles SET status = 'claimed', claimed_by = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND status = 'pending_review'"
      ).bind(reviewer.username, id).run();
      if (!claimRes.meta || claimRes.meta.changes === 0) {
        return secureJson({ error: "This article was just claimed by someone else." }, { status: 409 });
      }
      await log(env, reviewer.username, "CLAIM_ARTICLE", `Claimed article "${article.title}" (ID ${id}) for review`);
      return secureJson({ success: true });
    }
    if (url.pathname === "/api/editor/my-claims" && request.method === "POST") {
      const reviewer = await requireEditorOrAdmin(env, request);
      if (!reviewer) return secureJson({ error: "Unauthorized" }, { status: 403 });
      const results = await env.DB.prepare(
        "SELECT id, title, category, author, content, status, review_notes, created_at, updated_at FROM articles WHERE claimed_by = ? AND status IN ('claimed', 'returned') ORDER BY updated_at DESC"
      ).bind(reviewer.username).all();
      return secureJson(results.results);
    }
    if (url.pathname === "/api/admin/all-claimed" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return secureJson({ error: "Unauthorized" }, { status: 403 });
      const results = await env.DB.prepare(
        "SELECT id, title, category, author, content, status, claimed_by, review_notes, created_at, updated_at FROM articles WHERE status IN ('claimed', 'returned') ORDER BY updated_at DESC"
      ).all();
      return secureJson(results.results);
    }
    if (url.pathname === "/api/admin/steal-claim" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return secureJson({ error: "Unauthorized" }, { status: 403 });
      const { id } = await request.json();
      const article = await env.DB.prepare("SELECT * FROM articles WHERE id = ?").bind(id).first();
      if (!article) return secureJson({ error: "Not found" }, { status: 404 });
      if (!["pending_review", "claimed", "returned"].includes(article.status)) {
        return secureJson({ error: "This article isn't in a reviewable state." }, { status: 400 });
      }
      const previousOwner = article.claimed_by;
      const newStatus = article.status === "pending_review" ? "claimed" : article.status;
      await env.DB.prepare(
        "UPDATE articles SET status = ?, claimed_by = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
      ).bind(newStatus, admin.username, id).run();
      await log(
        env,
        admin.username,
        "ADMIN_REASSIGN_CLAIM",
        previousOwner ? `Took over article "${article.title}" (ID ${id}) from ${previousOwner}` : `Claimed article "${article.title}" (ID ${id}) directly from the pending pool`
      );
      return secureJson({ success: true });
    }
    if (url.pathname === "/api/editor/approve" && request.method === "POST") {
      const reviewer = await requireEditorOrAdmin(env, request);
      if (!reviewer) return secureJson({ error: "Unauthorized" }, { status: 403 });
      const { id } = await request.json();
      const article = await env.DB.prepare("SELECT * FROM articles WHERE id = ?").bind(id).first();
      if (!article) return secureJson({ error: "Not found" }, { status: 404 });
      const adminCanAct = reviewer.role === "admin" && (article.status === "claimed" || article.status === "returned");
      const editorCanAct = reviewer.role !== "admin" && article.status === "claimed" && article.claimed_by === reviewer.username;
      if (!adminCanAct && !editorCanAct) {
        if (article.status !== "claimed" && article.status !== "returned") {
          return secureJson({ error: "Only claimed or returned articles can be approved." }, { status: 400 });
        }
        return secureJson({ error: "This article is claimed by another editor." }, { status: 403 });
      }
      await env.DB.prepare(
        "UPDATE articles SET status = 'published', reviewed_by = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
      ).bind(reviewer.username, id).run();
      await log(env, reviewer.username, "APPROVE_ARTICLE", `Approved and published article "${article.title}" (ID ${id}) by ${article.author}`);
      return secureJson({ success: true });
    }
    if (url.pathname === "/api/editor/return" && request.method === "POST") {
      const reviewer = await requireEditorOrAdmin(env, request);
      if (!reviewer) return secureJson({ error: "Unauthorized" }, { status: 403 });
      const { id, notes } = await request.json();
      if (!notes || !notes.trim()) {
        return secureJson({ error: "Instructions are required when returning an article." }, { status: 400 });
      }
      const article = await env.DB.prepare("SELECT * FROM articles WHERE id = ?").bind(id).first();
      if (!article) return secureJson({ error: "Not found" }, { status: 404 });
      if (article.status !== "claimed") {
        return secureJson({ error: "Only claimed articles can be returned." }, { status: 400 });
      }
      if (reviewer.role !== "admin" && article.claimed_by !== reviewer.username) {
        return secureJson({ error: "This article is claimed by another editor." }, { status: 403 });
      }
      await env.DB.prepare(
        "UPDATE articles SET status = 'returned', review_notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
      ).bind(notes, id).run();
      await log(env, reviewer.username, "RETURN_ARTICLE", `Returned article "${article.title}" (ID ${id}) to ${article.author} with revision notes`);
      return secureJson({ success: true });
    }
    if (url.pathname === "/api/editor/deny" && request.method === "POST") {
      const reviewer = await requireEditorOrAdmin(env, request);
      if (!reviewer) return secureJson({ error: "Unauthorized" }, { status: 403 });
      const { id, notes } = await request.json();
      const article = await env.DB.prepare("SELECT * FROM articles WHERE id = ?").bind(id).first();
      if (!article) return secureJson({ error: "Not found" }, { status: 404 });
      const adminCanAct = reviewer.role === "admin" && (article.status === "claimed" || article.status === "returned");
      const editorCanAct = reviewer.role !== "admin" && article.status === "claimed" && article.claimed_by === reviewer.username;
      if (!adminCanAct && !editorCanAct) {
        if (article.status !== "claimed" && article.status !== "returned") {
          return secureJson({ error: "Only claimed or returned articles can be denied." }, { status: 400 });
        }
        return secureJson({ error: "This article is claimed by another editor." }, { status: 403 });
      }
      await env.DB.prepare(
        "UPDATE articles SET status = 'denied', review_notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
      ).bind(notes || null, id).run();
      await log(env, reviewer.username, "DENY_ARTICLE", `Denied article "${article.title}" (ID ${id}) by ${article.author}`);
      return secureJson({ success: true });
    }
    if (url.pathname === "/api/admin/articles" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return secureJson({ error: "Unauthorized" }, { status: 403 });
      const { filter } = await request.json();
      let query = "SELECT * FROM articles ORDER BY created_at DESC";
      if (filter === "censored") query = "SELECT * FROM articles WHERE status = 'censored' ORDER BY created_at DESC";
      if (filter === "published") query = "SELECT * FROM articles WHERE status = 'published' ORDER BY created_at DESC";
      const results = await env.DB.prepare(query).all();
      return secureJson(results.results);
    }
    if (url.pathname === "/api/admin/edit" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return secureJson({ error: "Unauthorized" }, { status: 403 });
      const { id, title, content, image_url: imageUrlRaw, remove_image } = await request.json();
      if (!title || !title.trim()) return secureJson({ error: "Title is required." }, { status: 400 });
      if (!content || !content.trim()) return secureJson({ error: "Content is required." }, { status: 400 });
      if (title.trim().length > MAX_TITLE_LEN) return secureJson({ error: `Title must be under ${MAX_TITLE_LEN} characters.` }, { status: 400 });
      if (content.trim().length > MAX_CONTENT_LEN) return secureJson({ error: `Content must be under ${MAX_CONTENT_LEN} characters.` }, { status: 400 });
      let imageUpdateSql = "";
      let imageUpdateVal = void 0;
      if (remove_image) {
        imageUpdateSql = ", image_url = NULL";
      } else if (imageUrlRaw !== void 0) {
        const imageUrl = validateImageUrl(imageUrlRaw);
        if (imageUrlRaw && !imageUrl) return secureJson({ error: "Invalid or oversized image." }, { status: 400 });
        imageUpdateSql = ", image_url = ?";
        imageUpdateVal = imageUrl;
      }
      const sql = `UPDATE articles SET title = ?, content = ?${imageUpdateSql}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
      const binds = imageUpdateVal !== void 0 ? [title.trim(), content.trim(), imageUpdateVal, id] : [title.trim(), content.trim(), id];
      await env.DB.prepare(sql).bind(...binds).run();
      await log(env, admin.username, "EDIT_ARTICLE", `Edited article ID ${id} \u2014 new title: "${title.trim()}"`);
      return secureJson({ success: true });
    }
    if (url.pathname === "/api/admin/censor" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return secureJson({ error: "Unauthorized" }, { status: 403 });
      const { id } = await request.json();
      const article = await env.DB.prepare("SELECT status FROM articles WHERE id = ?").bind(id).first();
      if (!article) return secureJson({ error: "Not found" }, { status: 404 });
      const newStatus = article.status === "censored" ? "published" : "censored";
      await env.DB.prepare("UPDATE articles SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(newStatus, id).run();
      await log(env, admin.username, newStatus === "censored" ? "CENSOR_ARTICLE" : "UNCENSOR_ARTICLE", `Article ID ${id} set to ${newStatus}`);
      return secureJson({ success: true });
    }
    if (url.pathname === "/api/admin/delete" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return secureJson({ error: "Unauthorized" }, { status: 403 });
      const { id } = await request.json();
      const article = await env.DB.prepare("SELECT title FROM articles WHERE id = ?").bind(id).first();
      await env.DB.prepare("DELETE FROM comments WHERE article_id = ?").bind(id).run();
      await env.DB.prepare("DELETE FROM favorites WHERE article_id = ?").bind(id).run();
      await env.DB.prepare("DELETE FROM page_views WHERE article_id = ?").bind(id).run();
      await env.DB.prepare("DELETE FROM articles WHERE id = ?").bind(id).run();
      await log(env, admin.username, "DELETE_ARTICLE", `Deleted article ID ${id} \u2014 "${article?.title}"`);
      return secureJson({ success: true });
    }
    if (url.pathname === "/api/admin/users" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return secureJson({ error: "Unauthorized" }, { status: 403 });
      const results = await env.DB.prepare(
        "SELECT id, username, role, status, created_at, last_login_at FROM users ORDER BY role ASC"
      ).all();
      return secureJson(results.results);
    }
    if (url.pathname === "/api/admin/user-detail" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return secureJson({ error: "Unauthorized" }, { status: 403 });
      const { targetId } = await request.json();
      const target = await env.DB.prepare(
        "SELECT id, username, role, status, created_at, last_login_at FROM users WHERE id = ?"
      ).bind(targetId).first();
      if (!target) return secureJson({ error: "Not found" }, { status: 404 });
      const articleCount = await env.DB.prepare(
        "SELECT COUNT(*) as count FROM articles WHERE author = ?"
      ).bind(target.username).first();
      return secureJson({ ...target, article_count: articleCount.count });
    }
    if (url.pathname === "/api/admin/user-history" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return secureJson({ error: "Unauthorized" }, { status: 403 });
      const { targetId } = await request.json();
      const target = await env.DB.prepare("SELECT username FROM users WHERE id = ?").bind(targetId).first();
      if (!target) return secureJson({ error: "Not found" }, { status: 404 });
      const results = await env.DB.prepare(
        "SELECT id, action, details, created_at FROM logs WHERE username = ? ORDER BY created_at DESC LIMIT 500"
      ).bind(target.username).all();
      return secureJson(results.results);
    }
    if (url.pathname === "/api/admin/create-user" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return secureJson({ error: "Unauthorized" }, { status: 403 });
      const { newUsername, newPassword, role } = await request.json();
      if (!newUsername || !newUsername.trim()) return secureJson({ error: "Username is required." }, { status: 400 });
      if (!newPassword || newPassword.length < 8) return secureJson({ error: "Password must be at least 8 characters." }, { status: 400 });
      if (!["writer", "editor", "admin"].includes(role)) return secureJson({ error: "Invalid role." }, { status: 400 });
      if (newUsername.trim().length > 64) return secureJson({ error: "Username too long." }, { status: 400 });
      const existing = await env.DB.prepare("SELECT id FROM users WHERE username = ?").bind(newUsername.trim()).first();
      if (existing) return secureJson({ error: "Username already exists" });
      const { hash, salt } = await hashPassword(newPassword);
      await env.DB.prepare(
        "INSERT INTO users (username, password, password_salt, role, created_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)"
      ).bind(newUsername.trim(), hash, salt, role).run();
      await log(env, admin.username, "CREATE_USER", `Created user "${newUsername.trim()}" with role "${role}"`);
      return secureJson({ success: true });
    }
    if (url.pathname === "/api/admin/change-role" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return secureJson({ error: "Unauthorized" }, { status: 403 });
      const { targetId, role } = await request.json();
      if (!["writer", "editor", "admin"].includes(role)) {
        return secureJson({ error: "Invalid role" }, { status: 400 });
      }
      const target = await env.DB.prepare("SELECT username FROM users WHERE id = ?").bind(targetId).first();
      await env.DB.prepare("UPDATE users SET role = ? WHERE id = ?").bind(role, targetId).run();
      await log(env, admin.username, "CHANGE_ROLE", `Changed role of "${target?.username}" to "${role}"`);
      return secureJson({ success: true });
    }
    if (url.pathname === "/api/admin/set-status" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return secureJson({ error: "Unauthorized" }, { status: 403 });
      const { targetId, status } = await request.json();
      if (!["active", "suspended"].includes(status)) return secureJson({ error: "Invalid status" }, { status: 400 });
      const target = await env.DB.prepare("SELECT username FROM users WHERE id = ?").bind(targetId).first();
      await env.DB.prepare("UPDATE users SET status = ? WHERE id = ?").bind(status, targetId).run();
      if (status === "suspended" && target) {
        await env.DB.prepare("DELETE FROM sessions WHERE username = ?").bind(target.username).run();
      }
      await log(env, admin.username, "SET_USER_STATUS", `Set status of "${target?.username}" to "${status}"`);
      return secureJson({ success: true });
    }
    if (url.pathname === "/api/admin/reset-password" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return secureJson({ error: "Unauthorized" }, { status: 403 });
      const { targetId, newPassword } = await request.json();
      const target = await env.DB.prepare("SELECT username FROM users WHERE id = ?").bind(targetId).first();
      if (!target) return secureJson({ error: "Not found" }, { status: 404 });
      const { hash, salt } = await hashPassword(newPassword);
      await env.DB.prepare("UPDATE users SET password = ?, password_salt = ? WHERE id = ?").bind(hash, salt, targetId).run();
      await env.DB.prepare("DELETE FROM sessions WHERE username = ?").bind(target.username).run();
      await log(env, admin.username, "RESET_PASSWORD", `Reset password for "${target.username}"`);
      return secureJson({ success: true });
    }
    if (url.pathname === "/api/admin/delete-user" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return secureJson({ error: "Unauthorized" }, { status: 403 });
      const { targetId } = await request.json();
      const target = await env.DB.prepare("SELECT username FROM users WHERE id = ?").bind(targetId).first();
      await env.DB.prepare("DELETE FROM users WHERE id = ?").bind(targetId).run();
      if (target) await env.DB.prepare("DELETE FROM sessions WHERE username = ?").bind(target.username).run();
      await log(env, admin.username, "DELETE_USER", `Deleted user "${target?.username}"`);
      return secureJson({ success: true });
    }
    if (url.pathname === "/api/admin/logs" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return secureJson({ error: "Unauthorized" }, { status: 403 });
      const results = await env.DB.prepare("SELECT * FROM logs ORDER BY created_at DESC LIMIT 500").all();
      return secureJson(results.results);
    }
    async function verifyDcWebhookSignature(rawBody, signatureHeader, secret) {
      if (!signatureHeader || !signatureHeader.startsWith("sha256=")) return false;
      const expected = signatureHeader.slice(7);
      const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
      );
      const sig = await crypto.subtle.sign("HMAC", key, rawBody);
      const hex = Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
      if (hex.length !== expected.length) return false;
      let diff = 0;
      for (let i = 0; i < hex.length; i++) diff |= hex.charCodeAt(i) ^ expected.charCodeAt(i);
      return diff === 0;
    }
    __name(verifyDcWebhookSignature, "verifyDcWebhookSignature");
    function parseBidIdFromMemo(memo) {
      if (!memo || typeof memo !== "string") return null;
      const m = memo.trim().match(/^bid:(\d+)$/i);
      return m ? parseInt(m[1], 10) : null;
    }
    __name(parseBidIdFromMemo, "parseBidIdFromMemo");
    if (url.pathname === "/api/ads/bids" && request.method === "GET") {
      const date = url.searchParams.get("date");
      const slot = parseInt(url.searchParams.get("slot") || "1");
      if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date) || ![1, 2, 3].includes(slot)) {
        return new Response(JSON.stringify({ error: "Invalid date or slot" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      const rows = await env.DB.prepare(
        `SELECT advertiser_name, bid_amount, created_at
         FROM ad_bids
         WHERE target_date = ? AND slot_number = ? AND status = 'pending'
         ORDER BY bid_amount DESC, id ASC
         LIMIT 3`
      ).bind(date, slot).all();
      return new Response(JSON.stringify(rows.results || []), {
        headers: { "Content-Type": "application/json", ...securityHeaders() }
      });
    }
    if (url.pathname === "/api/ads/bid" && request.method === "POST") {
      pruneRateLimitStore();
      if (isRateLimited(`bid:${clientIp}`, 5, 6e4)) {
        return secureJson({ error: "Too many bid submissions \u2014 please wait a minute and try again." }, { status: 429 });
      }
      let body;
      try {
        body = await request.json();
      } catch {
        return new Response("Bad JSON", { status: 400 });
      }
      const { advertiser_name, contact, email, discord_username, image_url, dest_url, bid_amount, target_date, slot_number } = body;
      if (!advertiser_name || !contact || !image_url || !dest_url || !bid_amount || !target_date || !slot_number) {
        return secureJson({ error: "Missing required fields" }, { status: 400 });
      }
      const adv = String(advertiser_name).trim();
      const con = String(contact).trim();
      const eml = email ? String(email).trim() : "";
      const dsc = discord_username ? String(discord_username).trim() : "";
      if (adv.length < 1 || adv.length > 100) return secureJson({ error: "advertiser_name must be 1\u2013100 characters" }, { status: 400 });
      if (con.length < 1 || con.length > 100) return secureJson({ error: "contact must be 1\u2013100 characters" }, { status: 400 });
      if (eml.length > 254) return secureJson({ error: "email is too long" }, { status: 400 });
      if (dsc.length > 100) return secureJson({ error: "discord_username is too long" }, { status: 400 });
      if (eml && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(eml)) return secureJson({ error: "email is not a valid address" }, { status: 400 });
      const cleanImageUrl = validateImageUrl(image_url, MAX_AD_IMAGE_BYTES);
      if (!cleanImageUrl) return secureJson({ error: "image_url must be an uploaded PNG, JPEG, GIF, or WebP image (max 800 KB)" }, { status: 400 });
      const cleanDestUrl = validateHttpUrl(dest_url);
      if (!cleanDestUrl) return secureJson({ error: "dest_url must be a valid http(s) URL" }, { status: 400 });
      if (![1, 2, 3].includes(Number(slot_number))) {
        return secureJson({ error: "slot_number must be 1, 2, or 3" }, { status: 400 });
      }
      if (typeof target_date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(target_date)) {
        return secureJson({ error: "target_date must be in YYYY-MM-DD format" }, { status: 400 });
      }
      const parsedDate = /* @__PURE__ */ new Date(`${target_date}T00:00:00Z`);
      if (isNaN(parsedDate.getTime()) || target_date !== parsedDate.toISOString().slice(0, 10)) {
        return secureJson({ error: "target_date is not a real calendar date" }, { status: 400 });
      }
      const todayStr = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      if (target_date <= todayStr) {
        return secureJson({ error: "target_date must be a future date" }, { status: 400 });
      }
      const amt = Number(bid_amount);
      if (!Number.isFinite(amt) || amt <= 0) {
        return secureJson({ error: "bid_amount must be a positive number" }, { status: 400 });
      }
      if (amt > 1e6) {
        return secureJson({ error: "bid_amount exceeds the maximum allowed" }, { status: 400 });
      }
      await env.DB.prepare(
        `INSERT INTO ad_bids (advertiser_name, contact, email, discord_username, image_url, dest_url, bid_amount, target_date, slot_number)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(adv, con, eml, dsc, cleanImageUrl, cleanDestUrl, amt, target_date, Number(slot_number)).run();
      return secureJson({ ok: true, message: "Bid received. Winners notified after 8 PM UTC." });
    }
    if (url.pathname === "/api/ads/current" && request.method === "GET") {
      pruneRateLimitStore();
      if (isRateLimited(`ads_current:${clientIp}`, 30, 6e4)) {
        return new Response(JSON.stringify({ error: "Too many requests" }), {
          status: 429,
          headers: { "Content-Type": "application/json", ...securityHeaders() }
        });
      }
      const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      const rows = await env.DB.prepare(
        `SELECT id, slot_number, image_url, dest_url, advertiser_name
         FROM ad_slots WHERE run_date = ? ORDER BY slot_number`
      ).bind(today).all();
      const visitorId = request.headers.get("Cookie")?.match(/jni_vid=([^;]+)/)?.[1] || null;
      for (const row of rows.results || []) {
        if (visitorId) {
          const seen = await env.DB.prepare(
            `SELECT 1 FROM ad_events
             WHERE ad_slot_id = ? AND visitor_id = ? AND event_type = 'impression'
               AND DATE(created_at) = ? LIMIT 1`
          ).bind(row.id, visitorId, today).first();
          if (seen) continue;
        }
        await env.DB.prepare(
          `INSERT INTO ad_events (ad_slot_id, event_type, visitor_id) VALUES (?, 'impression', ?)`
        ).bind(row.id, visitorId).run();
        await env.DB.prepare(
          `UPDATE ad_slots SET impressions = impressions + 1 WHERE id = ?`
        ).bind(row.id).run();
      }
      return new Response(JSON.stringify(rows.results || []), {
        headers: { "Content-Type": "application/json", ...securityHeaders() }
      });
    }
    if (url.pathname.startsWith("/api/ads/click/") && request.method === "GET") {
      pruneRateLimitStore();
      if (isRateLimited(`ads_click:${clientIp}`, 20, 6e4)) {
        return new Response("Too many requests", { status: 429 });
      }
      const slotId = parseInt(url.pathname.slice("/api/ads/click/".length));
      if (!slotId) return new Response("Bad request", { status: 400 });
      const row = await env.DB.prepare(
        `SELECT dest_url FROM ad_slots WHERE id = ?`
      ).bind(slotId).first();
      if (!row) return new Response("Ad not found", { status: 404 });
      const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      const visitorId = request.headers.get("Cookie")?.match(/jni_vid=([^;]+)/)?.[1] || null;
      let alreadyClicked = false;
      if (visitorId) {
        const seen = await env.DB.prepare(
          `SELECT 1 FROM ad_events
           WHERE ad_slot_id = ? AND visitor_id = ? AND event_type = 'click'
             AND DATE(created_at) = ? LIMIT 1`
        ).bind(slotId, visitorId, today).first();
        alreadyClicked = !!seen;
      }
      if (!alreadyClicked) {
        await env.DB.prepare(
          `INSERT INTO ad_events (ad_slot_id, event_type, visitor_id) VALUES (?, 'click', ?)`
        ).bind(slotId, visitorId).run();
        await env.DB.prepare(
          `UPDATE ad_slots SET clicks = clicks + 1 WHERE id = ?`
        ).bind(slotId).run();
      }
      const safeDest = validateHttpUrl(row.dest_url);
      if (!safeDest) return new Response("This ad has an invalid destination.", { status: 400 });
      return Response.redirect(safeDest, 302);
    }
    if (url.pathname === "/api/ads/report" && request.method === "POST") {
      const reviewer = await requireEditorOrAdmin(env, request);
      if (!reviewer) return secureJson({ error: "Unauthorized" }, { status: 403 });
      let body;
      try {
        body = await request.json();
      } catch {
        return new Response("Bad JSON", { status: 400 });
      }
      const { from_date, to_date } = body;
      const from = from_date || new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
      const to = to_date || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      const rows = await env.DB.prepare(
        `SELECT s.id, s.slot_number, s.run_date, s.advertiser_name, s.contact,
                s.bid_amount, s.impressions, s.clicks,
                CASE WHEN s.impressions > 0 THEN ROUND(100.0*s.clicks/s.impressions,2) ELSE 0 END AS ctr
         FROM ad_slots s
         WHERE s.run_date BETWEEN ? AND ?
         ORDER BY s.run_date DESC, s.slot_number`
      ).bind(from, to).all();
      return new Response(JSON.stringify(rows.results || []), {
        headers: { "Content-Type": "application/json", ...securityHeaders() }
      });
    }
    if (url.pathname === "/api/ads/webhook/payment" && request.method === "POST") {
      const secret = env.DC_WEBHOOK_SECRET;
      if (!secret) {
        console.error("DC_WEBHOOK_SECRET not set \u2014 webhook ignored");
        return new Response("ok", { status: 200 });
      }
      const rawBody = await request.arrayBuffer();
      const sigHeader = request.headers.get("X-Treasury-Signature") || "";
      const deliveryId = request.headers.get("X-Treasury-Delivery-Id") || String(Date.now());
      const valid = await verifyDcWebhookSignature(rawBody, sigHeader, secret);
      if (!valid) {
        console.warn("DC webhook: invalid signature, rejecting");
        return new Response("Forbidden", { status: 403 });
      }
      const alreadyProcessed = await env.DB.prepare(
        `SELECT id FROM webhook_deliveries WHERE delivery_id = ?`
      ).bind(deliveryId).first();
      if (alreadyProcessed) {
        return new Response("ok", { status: 200 });
      }
      let payload;
      try {
        payload = JSON.parse(new TextDecoder().decode(rawBody));
      } catch {
        return new Response("Bad JSON", { status: 400 });
      }
      const txn = payload.transaction;
      if (!txn) return new Response("ok", { status: 200 });
      const amount = parseFloat(txn.amount);
      if (!amount || amount <= 0) return new Response("ok", { status: 200 });
      await env.DB.prepare(
        `INSERT OR IGNORE INTO webhook_deliveries (delivery_id, txn_id) VALUES (?, ?)`
      ).bind(deliveryId, String(txn.txnId || "")).run();
      const bidId = parseBidIdFromMemo(txn.memo || txn.message || "");
      if (!bidId) {
        console.log(`DC webhook: unrecognised memo "${txn.memo}" \u2014 ignoring`);
        return new Response("ok", { status: 200 });
      }
      const bid = await env.DB.prepare(
        `SELECT * FROM ad_bids WHERE id = ?`
      ).bind(bidId).first();
      if (!bid) {
        console.warn(`DC webhook: bid ${bidId} not found`);
        return new Response("ok", { status: 200 });
      }
      let paymentStatus;
      const tolerance = 0.01;
      if (Math.abs(amount - bid.bid_amount) <= tolerance) {
        paymentStatus = "paid";
      } else if (amount > bid.bid_amount) {
        paymentStatus = "overpaid";
      } else {
        paymentStatus = "underpaid";
      }
      await env.DB.prepare(
        `UPDATE ad_bids
         SET payment_status = ?,
             payment_txn_id = ?,
             payment_amount_received = ?,
             payment_received_at = datetime('now')
         WHERE id = ?`
      ).bind(paymentStatus, String(txn.txnId || txn.postingId || deliveryId), amount, bidId).run();
      console.log(`DC webhook: bid ${bidId} marked ${paymentStatus} (expected ${bid.bid_amount}, received ${amount})`);
      if (paymentStatus === "paid" || paymentStatus === "overpaid") {
        const slotLabelPay = SLOT_LABELS[bid.slot_number] || `Slot ${bid.slot_number}`;
        if (bid.email) {
          await sendEmail(env, {
            to: bid.email,
            subject: `\u2705 Payment confirmed \u2014 Jaronite News ad #${bid.id}`,
            html: paymentConfirmedEmailHtml(bid, slotLabelPay, amount)
          });
        }
        if (bid.discord_username) {
          await sendDiscordDm(env, bid.discord_username, confirmedDiscordMsg(bid, slotLabelPay, amount));
        }
      }
      return new Response("ok", { status: 200 });
    }
    if (url.pathname === "/api/ads/payment-status" && request.method === "GET") {
      const botKey = env.BOT_API_KEY;
      const presentedKey = request.headers.get("X-Bot-Key");
      const isBot = botKey && presentedKey && presentedKey.length === botKey.length && timingSafeEqualStr(presentedKey, botKey);
      const reviewer = isBot ? null : await requireEditorOrAdmin(env, request);
      if (!isBot && !reviewer) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 403,
          headers: { "Content-Type": "application/json" }
        });
      }
      const from = url.searchParams.get("from_date") || new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
      const to = url.searchParams.get("to_date") || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      const rows = await env.DB.prepare(
        `SELECT b.id, b.advertiser_name, b.contact, b.bid_amount,
                b.target_date, b.slot_number, b.status AS bid_status,
                b.payment_status, b.payment_amount_received,
                b.payment_txn_id, b.payment_received_at,
                b.email, b.discord_username, b.notified_at
         FROM ad_bids b
         WHERE b.status = 'won' AND b.target_date BETWEEN ? AND ?
         ORDER BY b.target_date DESC, b.slot_number`
      ).bind(from, to).all();
      return new Response(JSON.stringify(rows.results || []), {
        headers: { "Content-Type": "application/json", ...securityHeaders() }
      });
    }
    if (url.pathname === "/api/ads/resend-notification" && request.method === "POST") {
      const reviewer = await requireEditorOrAdmin(env, request);
      if (!reviewer) return secureJson({ error: "Unauthorized" }, { status: 403 });
      const { bid_id } = await request.json();
      const bidId = parseInt(bid_id, 10);
      if (!bidId || isNaN(bidId)) return secureJson({ error: "Invalid bid_id" }, { status: 400 });
      const bid = await env.DB.prepare(`SELECT * FROM ad_bids WHERE id = ?`).bind(bidId).first();
      if (!bid) return secureJson({ error: "Bid not found" }, { status: 404 });
      if (bid.status !== "won") {
        return secureJson({ error: "Only won bids can be notified." }, { status: 400 });
      }
      const slotLabel = SLOT_LABELS[bid.slot_number] || `Slot ${bid.slot_number}`;
      const emailRes = bid.email ? await sendEmail(env, {
        to: bid.email,
        subject: `\u{1F389} You won a Jaronite News ad slot for ${bid.target_date}!`,
        html: winEmailHtml(bid, slotLabel)
      }) : { ok: false, skipped: "no email on file" };
      const discordRes = bid.discord_username ? await sendDiscordDm(env, bid.discord_username, winDiscordMsg(bid, slotLabel)) : { ok: false, skipped: "no Discord username on file" };
      const notified = emailRes.ok || discordRes.ok;
      if (notified) {
        await env.DB.prepare(`UPDATE ad_bids SET notified_at = datetime('now') WHERE id = ?`).bind(bidId).run();
      }
      await log(
        env,
        reviewer.username,
        "RESEND_AD_NOTIFICATION",
        `Re-sent win notification for bid #${bidId} (${bid.advertiser_name}) \u2014 email: ${emailRes.ok ? "sent" : emailRes.skipped || emailRes.error}; discord: ${discordRes.ok ? "sent" : discordRes.skipped || discordRes.error}`
      );
      return secureJson({ success: true, notified, email: emailRes, discord: discordRes });
    }
    if (url.pathname === "/advertise") {
      const advUrl = new URL("/advertise.html", url.origin);
      try {
        const advAsset = await (0, import_kv_asset_handler.getAssetFromKV)(
          { request: new Request(advUrl.toString(), request), waitUntil(p) {
            return ctx.waitUntil(p);
          } },
          { ASSET_NAMESPACE: env.__STATIC_CONTENT, ASSET_MANIFEST: assetManifest }
        );
        const advH = new Headers(advAsset.headers);
        for (const [k, v] of Object.entries(securityHeaders())) advH.set(k, v);
        return new Response(advAsset.body, { status: advAsset.status, headers: advH });
      } catch (e) {
        return new Response("Not found", { status: 404 });
      }
    }
    if (url.pathname === "/articles") {
      const articlesUrl = new URL("/articles.html", url.origin);
      try {
        const ar = await (0, import_kv_asset_handler.getAssetFromKV)(
          { request: new Request(articlesUrl.toString(), request), waitUntil(p) {
            return ctx.waitUntil(p);
          } },
          { ASSET_NAMESPACE: env.__STATIC_CONTENT, ASSET_MANIFEST: assetManifest }
        );
        const arH = new Headers(ar.headers);
        for (const [k, v] of Object.entries(securityHeaders())) arH.set(k, v);
        return new Response(ar.body, { status: ar.status, headers: arH });
      } catch (e) {
        return new Response("Not found", { status: 404 });
      }
    }
    if (url.pathname === "/favorites") {
      const favUrl = new URL("/favorites.html", url.origin);
      try {
        const fv = await (0, import_kv_asset_handler.getAssetFromKV)(
          { request: new Request(favUrl.toString(), request), waitUntil(p) {
            return ctx.waitUntil(p);
          } },
          { ASSET_NAMESPACE: env.__STATIC_CONTENT, ASSET_MANIFEST: assetManifest }
        );
        const fvH = new Headers(fv.headers);
        for (const [k, v] of Object.entries(securityHeaders())) fvH.set(k, v);
        return new Response(fv.body, { status: fv.status, headers: fvH });
      } catch (e) {
        return new Response("Not found", { status: 404 });
      }
    }
    if (url.pathname.startsWith("/article/")) {
      const articleUrl = new URL("/article.html", url.origin);
      const articleRequest = new Request(articleUrl.toString(), request);
      try {
        const ar2 = await (0, import_kv_asset_handler.getAssetFromKV)(
          { request: articleRequest, waitUntil(promise) {
            return ctx.waitUntil(promise);
          } },
          { ASSET_NAMESPACE: env.__STATIC_CONTENT, ASSET_MANIFEST: assetManifest }
        );
        const ar2H = new Headers(ar2.headers);
        for (const [k, v] of Object.entries(securityHeaders())) ar2H.set(k, v);
        return new Response(ar2.body, { status: ar2.status, headers: ar2H });
      } catch (e) {
        return new Response("Article page not found", { status: 404 });
      }
    }
    if (url.pathname.startsWith("/api/")) {
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json", ...securityHeaders() }
      });
    }
    const hasExtension = /\.[a-zA-Z0-9]+$/.test(url.pathname);
    if (!hasExtension && url.pathname !== "/") {
      try {
        const htmlUrl = new URL(url.pathname.replace(/\/$/, "") + ".html", url.origin);
        const htmlRequest = new Request(htmlUrl.toString(), request);
        const htmlAsset = await (0, import_kv_asset_handler.getAssetFromKV)(
          { request: htmlRequest, waitUntil(promise) {
            return ctx.waitUntil(promise);
          } },
          { ASSET_NAMESPACE: env.__STATIC_CONTENT, ASSET_MANIFEST: assetManifest }
        );
        const htmlH = new Headers(htmlAsset.headers);
        for (const [k, v] of Object.entries(securityHeaders())) htmlH.set(k, v);
        return new Response(htmlAsset.body, { status: htmlAsset.status, headers: htmlH });
      } catch (e) {
      }
    }
    try {
      const assetResponse = await (0, import_kv_asset_handler.getAssetFromKV)(
        { request, waitUntil(promise) {
          return ctx.waitUntil(promise);
        } },
        { ASSET_NAMESPACE: env.__STATIC_CONTENT, ASSET_MANIFEST: assetManifest }
      );
      const newHeaders = new Headers(assetResponse.headers);
      for (const [k, v] of Object.entries(securityHeaders())) newHeaders.set(k, v);
      return new Response(assetResponse.body, { status: assetResponse.status, headers: newHeaders });
    } catch (e) {
      return new Response("404 Not Found", { status: 404 });
    }
  },
  // ================================================================
  // CRON — Ad system automation
  // Runs at 8 PM UTC (award bids) and midnight UTC (safety check).
  // ================================================================
  async scheduled(event, env, ctx) {
    const cron = event && event.cron ? event.cron : "";
    const hour = (/* @__PURE__ */ new Date()).getUTCHours();
    const runAward = cron === "0 20 * * *" || !cron && hour === 20;
    const runCleanup = cron === "0 0 * * *" || !cron && hour === 0;
    if (runAward) {
      const tomorrow = /* @__PURE__ */ new Date();
      tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
      const targetDate = tomorrow.toISOString().slice(0, 10);
      for (let slot = 1; slot <= 3; slot++) {
        const winner = await env.DB.prepare(
          `SELECT * FROM ad_bids
           WHERE target_date = ? AND slot_number = ? AND status = 'pending'
           ORDER BY bid_amount DESC, id ASC LIMIT 1`
        ).bind(targetDate, slot).first();
        if (!winner) continue;
        await env.DB.prepare(
          `INSERT INTO ad_slots (slot_number, run_date, bid_id, advertiser_name, contact, image_url, dest_url, bid_amount)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)
           ON CONFLICT(slot_number, run_date) DO UPDATE SET
             bid_id = excluded.bid_id,
             advertiser_name = excluded.advertiser_name,
             contact = excluded.contact,
             image_url = excluded.image_url,
             dest_url = excluded.dest_url,
             bid_amount = excluded.bid_amount`
        ).bind(slot, targetDate, winner.id, winner.advertiser_name, winner.contact, winner.image_url, winner.dest_url, winner.bid_amount).run();
        await env.DB.prepare(
          `UPDATE ad_bids SET status = 'won', payment_status = 'awaiting_payment' WHERE id = ?`
        ).bind(winner.id).run();
        const slotLabelWin = SLOT_LABELS[slot] || `Slot ${slot}`;
        let emailRes = { ok: false };
        let discordRes = { ok: false };
        if (winner.email) {
          emailRes = await sendEmail(env, {
            to: winner.email,
            subject: `\u{1F389} You won a Jaronite News ad slot for ${targetDate}!`,
            html: winEmailHtml(winner, slotLabelWin)
          });
        }
        if (winner.discord_username) {
          discordRes = await sendDiscordDm(env, winner.discord_username, winDiscordMsg(winner, slotLabelWin));
        }
        if (emailRes.ok || discordRes.ok) {
          await env.DB.prepare(`UPDATE ad_bids SET notified_at = datetime('now') WHERE id = ?`).bind(winner.id).run();
        }
        await env.DB.prepare(
          `UPDATE ad_bids SET status = 'lost'
           WHERE target_date = ? AND slot_number = ? AND status = 'pending' AND id != ?`
        ).bind(targetDate, slot, winner.id).run();
      }
    }
    if (runCleanup) {
      const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      await env.DB.prepare(
        `UPDATE ad_bids SET status = 'lost'
         WHERE target_date <= ? AND status = 'pending'`
      ).bind(today).run();
      const unpaid = await env.DB.prepare(
        `SELECT * FROM ad_bids
         WHERE status = 'won'
           AND payment_status IN ('awaiting_payment', 'underpaid')
           AND target_date > ?
           AND email IS NOT NULL AND email != ''`
      ).bind(today).all();
      for (const bid of unpaid.results || []) {
        const daysUntilRun = Math.max(
          0,
          Math.ceil(((/* @__PURE__ */ new Date(`${bid.target_date}T00:00:00Z`)).getTime() - Date.now()) / 864e5)
        );
        const slotLabel = SLOT_LABELS[bid.slot_number] || `Slot ${bid.slot_number}`;
        if (bid.email) {
          await sendEmail(env, {
            to: bid.email,
            subject: `\u23F0 Reminder: payment pending for your Jaronite News ad #${bid.id}`,
            html: reminderEmailHtml(bid, slotLabel, daysUntilRun)
          });
        }
        if (bid.discord_username) {
          await sendDiscordDm(env, bid.discord_username, reminderDiscordMsg(bid, slotLabel));
        }
      }
    }
  }
};

// ../../AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_modules_watch_stub();
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// .wrangler/tmp/bundle-VpQHrK/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default
];
var middleware_insertion_facade_default = index_default;

// ../../AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/common.ts
init_modules_watch_stub();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-VpQHrK/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
