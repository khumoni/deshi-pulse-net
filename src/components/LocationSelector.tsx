import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bangladeshLocations } from "@/data/locations";
import { MapPin } from "lucide-react";

interface LocationSelectorProps {
  onLocationSelect: (location: { division: string; district: string; upazila: string }) => void;
  selectedLocation: { division: string; district: string; upazila: string } | null;
}

const LocationSelector = ({ onLocationSelect, selectedLocation }: LocationSelectorProps) => {
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  
  const handleDivisionChange = (division: string) => {
    setSelectedDivision(division);
    setSelectedDistrict("");
  };

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
  };

  const handleUpazilaChange = (upazila: string) => {
    if (selectedDivision && selectedDistrict) {
      onLocationSelect({
        division: selectedDivision,
        district: selectedDistrict,
        upazila: upazila
      });
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MapPin className="h-5 w-5 text-green-bangladesh" />
          এলাকা নির্বাচন করুন
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Division Selection */}
          <Select value={selectedDivision} onValueChange={handleDivisionChange}>
            <SelectTrigger>
              <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(bangladeshLocations.divisions).map(([key, division]) => (
                <SelectItem key={key} value={key}>
                  {division.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* District Selection */}
          <Select 
            value={selectedDistrict} 
            onValueChange={handleDistrictChange}
            disabled={!selectedDivision}
          >
            <SelectTrigger>
              <SelectValue placeholder="জেলা নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {selectedDivision && Object.entries(bangladeshLocations.divisions[selectedDivision as keyof typeof bangladeshLocations.divisions].districts).map(([key, district]) => (
                <SelectItem key={key} value={key}>
                  {district.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Upazila Selection */}
          <Select 
            onValueChange={handleUpazilaChange}
            disabled={!selectedDistrict}
          >
            <SelectTrigger>
              <SelectValue placeholder="উপজেলা নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {selectedDistrict && selectedDivision && 
                (bangladeshLocations.divisions as any)[selectedDivision]?.districts?.[selectedDistrict]?.upazilas?.map((upazila: string) => (
                  <SelectItem key={upazila} value={upazila}>
                    {upazila}
                  </SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </div>

        {selectedLocation && (
          <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
            <strong>নির্বাচিত এলাকা:</strong> {selectedLocation.upazila}, {selectedLocation.district}, {bangladeshLocations.divisions[selectedLocation.division as keyof typeof bangladeshLocations.divisions]?.name}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LocationSelector;