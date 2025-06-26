"use client";

import { X, MapPin, Calendar, AlertTriangle, CheckCircle } from "lucide-react";

const MessageDetailsModal = ({ message, isOpen, onClose, onMarkAsRead }) => {
  if (!isOpen || !message) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    // Handle MongoDB date format with $date property
    let dateToFormat = dateString;
    if (typeof dateString === "object" && dateString.$date) {
      dateToFormat = dateString.$date;
    }

    try {
      return new Date(dateToFormat).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "unread":
        return "bg-red-100 text-red-800";
      case "acknowledged":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const payload = message.payload || {};

  // Extract sector from location (second part after hyphen)
  const getAddress = (location) => {
    if (!location) return "Unknown";
    const parts = location.split("-");
    return parts[1] || "Unknown"; // Return only sector
  };

  // Create Google Maps link from coordinates
  const getLocationLink = (cords) => {
    if (!cords) return "#";
    const coords = cords.split(" ")[0];
    return `https://www.google.com/maps/search/?api=1&query=${coords}`;
  };

  // Parse location into district, sector, cell, village
  const getLocationParts = (location) => {
    if (!location)
      return {
        district: "Unknown",
        sector: "Unknown",
        cell: "Unknown",
        village: "Unknown",
      };
    const parts = location.split("-");
    return {
      district: parts[0] || "Unknown",
      sector: parts[1] || "Unknown",
      cell: parts[2] || "Unknown",
      village: parts[3] || "Unknown",
    };
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Message Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                message.status
              )}`}
            >
              {message.status || "Unknown"}
            </span>
            {message.status === "unread" && onMarkAsRead && (
              <button
                onClick={() => onMarkAsRead(message._id)}
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
              >
                Mark as Read
              </button>
            )}
          </div>

          {/* Crime Information */}
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Crime Alert
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-sm text-red-600">Crime Type</p>
                  <p className="font-medium text-red-800">
                    {payload.message || "Unknown"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  R
                </div>
                <div>
                  <p className="text-sm text-red-600">Reported By</p>
                  <p className="font-medium text-red-800">
                    {payload.from || "Anonymous"}
                  </p>
                </div>
              </div>

              {payload.location && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-red-500" />
                    <div className="w-full">
                      <p className="text-sm text-red-600 mb-2">
                        Location Details
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="font-medium text-red-700">
                            District:
                          </span>
                          <span className="ml-1 text-red-800">
                            {getLocationParts(payload.location).district}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-red-700">
                            Sector:
                          </span>
                          <span className="ml-1 text-red-800">
                            {getLocationParts(payload.location).sector}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-red-700">
                            Cell:
                          </span>
                          <span className="ml-1 text-red-800">
                            {getLocationParts(payload.location).cell}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-red-700">
                            Village:
                          </span>
                          <span className="ml-1 text-red-800">
                            {getLocationParts(payload.location).village}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {payload.cords && (
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-sm text-red-600">Coordinates</p>
                    <a
                      href={getLocationLink(payload.cords)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      View on Map
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Timestamp Information */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Received At</p>
                <p className="font-medium text-gray-800">
                  {formatDate(message.timestamp)}
                </p>
              </div>
            </div>

            {message.acknowledged_at && (
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-sm text-gray-500">Acknowledged At</p>
                  <p className="font-medium text-gray-800">
                    {formatDate(message.acknowledged_at)}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Technical Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Technical Details
            </h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <span className="font-medium">
                  Timestamp when theft occurred:
                </span>{" "}
                {formatDate(message.timestamp)}
              </p>
              <p>
                <span className="font-medium">Topic:</span>{" "}
                {message.topic || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageDetailsModal;
