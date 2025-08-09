import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bangladeshLocations, getDivisions, getDistricts, getUpazilas } from "@/data/bangladeshLocations";
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
            <SelectTrigger className="h-12">
              <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {getDivisions().map((division) => (
                <SelectItem key={division.key} value={division.key}>
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
            <SelectTrigger className="h-12">
              <SelectValue placeholder="জেলা নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {selectedDivision && getDistricts(selectedDivision).map((district) => (
                <SelectItem key={district.key} value={district.key}>
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
            <SelectTrigger className="h-12">
              <SelectValue placeholder="উপজেলা নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {selectedDistrict && selectedDivision && 
                getUpazilas(selectedDivision, selectedDistrict).map((upazila) => (
                  <SelectItem key={upazila.key} value={upazila.name}>
                    {upazila.name}
                  </SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </div>

        {selectedLocation && (
          <div className="text-sm text-muted-foreground bg-primary/5 p-4 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-primary" />
              <strong className="text-foreground">নির্বাচিত এলাকা:</strong>
            </div>
            <p className="text-foreground font-medium">
              {selectedLocation.upazila}, {selectedLocation.district}, {bangladeshLocations.divisions[selectedLocation.division as keyof typeof bangladeshLocations.divisions]?.name}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LocationSelector;