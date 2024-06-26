"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewUserContainer = exports.createListContextBlobs = exports.createListBlobs = exports.uploadAction = exports.downLoadDocument = exports.deleteBlob = exports.downloadFileFromBrowser = exports.createInnerContainer = exports.createStorageServiceClient = void 0;
// Azure Storage dependency
var storage_blob_1 = require("@azure/storage-blob");
function createStorageServiceClient() {
    // SAS token must have LIST permissions on container that haven't expired
    var sasToken = process.env.REACT_APP_AZURE_STORAGE_SAS_TOKEN;
    var address = process.env.REACT_APP_AZURE_STORAGE_ACCOUNT;
    if (sasToken === undefined || address === undefined) {
        throw new Error("undefined token or address");
    }
    // Create SAS URL
    var sasUrl = address + "?" + sasToken;
    // SAS tokens do not require an additional credential because
    // the token is the credential
    var credential = undefined;
    return new storage_blob_1.BlobServiceClient(sasUrl, credential);
}
exports.createStorageServiceClient = createStorageServiceClient;
function createInnerContainer(storageClient, containerName) {
    return __awaiter(this, void 0, void 0, function () {
        var containerClient;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, storageClient
                        .createContainer(containerName)
                        .then(function (res) { return res.containerClient; })];
                case 1:
                    containerClient = _a.sent();
                    return [2 /*return*/, containerClient];
            }
        });
    });
}
exports.createInnerContainer = createInnerContainer;
function downloadFileFromBrowser(blob) {
    var url = window.URL.createObjectURL(new Blob([blob]));
    var link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', "Downloads" + blob.type);
    // Append to html link element page
    document.body.appendChild(link);
    // Start download
    link.click();
    // Clean up and remove the link
    if (link.parentNode !== null) {
        link.parentNode.removeChild(link);
    }
}
exports.downloadFileFromBrowser = downloadFileFromBrowser;
function deleteBlob(containerName, blobName) {
    return __awaiter(this, void 0, void 0, function () {
        var blobServiceClient, containerClient, blockBlobClient, options, blobDeleteIfExistsResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blobServiceClient = createStorageServiceClient();
                    containerClient = blobServiceClient.getContainerClient(containerName);
                    return [4 /*yield*/, containerClient.getBlockBlobClient(blobName)];
                case 1:
                    blockBlobClient = _a.sent();
                    options = {
                        deleteSnapshots: 'include'
                    };
                    return [4 /*yield*/, blockBlobClient.deleteIfExists(options)];
                case 2:
                    blobDeleteIfExistsResponse = _a.sent();
                    if (!blobDeleteIfExistsResponse.errorCode) {
                        console.log("deleted blob ".concat(blobName));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.deleteBlob = deleteBlob;
function downLoadDocument(containerName, blobname) {
    return __awaiter(this, void 0, void 0, function () {
        var blobServiceClient, containerClient, blobClient;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blobServiceClient = createStorageServiceClient();
                    containerClient = blobServiceClient.getContainerClient(containerName);
                    return [4 /*yield*/, containerClient.getBlobClient(blobname)];
                case 1:
                    blobClient = _a.sent();
                    return [4 /*yield*/, blobClient.download()
                            .then(function (res) { return res.blobBody; })
                            .then(function (data) {
                            if (data === undefined) {
                                throw new Error("Fail to download");
                            }
                            else {
                                return data;
                            }
                        }).then(function (blob) {
                            downloadFileFromBrowser(blob);
                        })
                            .catch(function (err) {
                            console.log("Fail to download");
                            throw new Error("Fail to download");
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.downLoadDocument = downLoadDocument;
function uploadAction(file, fileName, containerName) {
    return __awaiter(this, void 0, void 0, function () {
        var blobServiceClient, containerClient, blockBlobClient, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blobServiceClient = createStorageServiceClient();
                    return [4 /*yield*/, createInnerContainer(blobServiceClient, containerName)
                            .catch(function (err) { return blobServiceClient.getContainerClient(containerName); })];
                case 1:
                    containerClient = _a.sent();
                    blockBlobClient = containerClient.getBlockBlobClient(fileName);
                    return [4 /*yield*/, blockBlobClient.uploadData(file)];
                case 2:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.uploadAction = uploadAction;
/**
 * Display list of patients
 *
*/
function createListBlobs(containerName, directory, key) {
    return __awaiter(this, void 0, void 0, function () {
        var out, regx, blobServiceClient, containerClient, _a, _b, _c, blob, e_1_1;
        var _d, e_1, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    out = [];
                    regx = new RegExp(key, "i");
                    blobServiceClient = createStorageServiceClient();
                    containerClient = blobServiceClient.getContainerClient(containerName);
                    _g.label = 1;
                case 1:
                    _g.trys.push([1, 6, 7, 12]);
                    _a = true, _b = __asyncValues(containerClient.listBlobsByHierarchy(directory));
                    _g.label = 2;
                case 2: return [4 /*yield*/, _b.next()];
                case 3:
                    if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 5];
                    _f = _c.value;
                    _a = false;
                    blob = _f;
                    if (regx.test(blob.name)) {
                        out.push(blob.name);
                    }
                    _g.label = 4;
                case 4:
                    _a = true;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _g.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _g.trys.push([7, , 10, 11]);
                    if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _e.call(_b)];
                case 8:
                    _g.sent();
                    _g.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [2 /*return*/, out];
            }
        });
    });
}
exports.createListBlobs = createListBlobs;
/**
 * Display list of initial input
 *
*/
function createListContextBlobs(containerName, directory, key) {
    return __awaiter(this, void 0, void 0, function () {
        var out, blobServiceClient, containerClient, _a, _b, _c, blob, e_2_1;
        var _d, e_2, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    out = [];
                    blobServiceClient = createStorageServiceClient();
                    containerClient = blobServiceClient.getContainerClient(containerName);
                    _g.label = 1;
                case 1:
                    _g.trys.push([1, 6, 7, 12]);
                    _a = true, _b = __asyncValues(containerClient.listBlobsByHierarchy(directory));
                    _g.label = 2;
                case 2: return [4 /*yield*/, _b.next()];
                case 3:
                    if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 5];
                    _f = _c.value;
                    _a = false;
                    blob = _f;
                    if (blob.name !== key) {
                        out.push(blob.name);
                    }
                    _g.label = 4;
                case 4:
                    _a = true;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_2_1 = _g.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _g.trys.push([7, , 10, 11]);
                    if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _e.call(_b)];
                case 8:
                    _g.sent();
                    _g.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [2 /*return*/, out];
            }
        });
    });
}
exports.createListContextBlobs = createListContextBlobs;
/**
 * Create a container for each user when they sign up
 *
 */
function createNewUserContainer(userName) {
    return __awaiter(this, void 0, void 0, function () {
        var storageService;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    storageService = createStorageServiceClient();
                    return [4 /*yield*/, createInnerContainer(storageService, "".concat(userName))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.createNewUserContainer = createNewUserContainer;
