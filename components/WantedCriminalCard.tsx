"use client";

import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface WantedCriminalCardProps {
  imageSrc: string;
  name: string;
  crime: string;
  reward?: string;
  dangerLevel?: "low" | "medium" | "high" | "extreme";
  lastSeen?: string;
  description?: string;
  additionalCrimes?: string[];
  characteristics?: string[];
}

const WantedCriminalCard = ({
  imageSrc,
  name,
  crime,
  reward = "Не указано",
  dangerLevel = "medium",
  lastSeen = "Неизвестно",
  description = "Информация отсутствует",
  additionalCrimes = [],
  characteristics = [],
}: WantedCriminalCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const dangerColors = {
    low: "bg-green-500",
    medium: "bg-yellow-500",
    high: "bg-orange-500",
    extreme: "bg-red-500",
  };

  const dangerLabels = {
    low: "Низкая",
    medium: "Средняя",
    high: "Высокая",
    extreme: "Критическая",
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <DialogTrigger asChild>
            <div className="bg-white p-5 shadow-md rounded flex flex-col items-center text-center cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 relative">
              <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${dangerColors[dangerLevel]}`} />
              <img
                src={imageSrc}
                alt={name}
                className="w-24 h-24 mb-4 rounded border-2 border-gray-300"
              />
              <h2 className="text-lg font-semibold">{name}</h2>
              <p className="text-gray-600 text-sm">{    }</p>
            </div>
          </DialogTrigger>
        </HoverCardTrigger>

        <HoverCardContent className="w-80" side="top">
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-sm">{name}</h4>
                <p className="text-xs text-gray-600">{crime}</p>
              </div>
              <Badge variant="outline" className={`${dangerColors[dangerLevel]} text-white border-0`}>
                {dangerLabels[dangerLevel]}
              </Badge>
            </div>
            <div className="text-xs space-y-1">
              <p><strong>Вознаграждение:</strong> {reward}</p>
              <p><strong>Последнее место:</strong> {lastSeen}</p>
            </div>
            <p className="text-xs text-gray-500 italic">Нажмите для подробностей</p>
          </div>
        </HoverCardContent>
      </HoverCard>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Досье преступника</DialogTitle>
          <DialogDescription>Подробная информация о разыскиваемом лице</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          <div className="flex gap-6">
            <img
              src={imageSrc}
              alt={name}
              className="w-32 h-32 rounded border-2 border-gray-300 object-cover"
            />
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-xl font-bold">{name}</h3>
                <Badge className={`${dangerColors[dangerLevel]} text-white border-0 mt-1`}>
                  Уровень опасности: {dangerLabels[dangerLevel]}
                </Badge>
              </div>
              <div className="space-y-1 text-sm">
                <p><strong>Основное обвинение:</strong> {crime}</p>
                <p><strong>Вознаграждение:</strong> {reward}</p>
                <p><strong>Последнее место обнаружения:</strong> {lastSeen}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Описание:</h4>
              <p className="text-sm text-gray-700">{description}</p>
            </div>

            {additionalCrimes.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Дополнительные преступления:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  {additionalCrimes.map((crime, index) => (
                    <li key={index}>{crime}</li>
                  ))}
                </ul>
              </div>
            )}

            {characteristics.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Особые приметы:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  {characteristics.map((char, index) => (
                    <li key={index}>{char}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
              <p className="text-sm text-yellow-800">
                <strong>⚠️ Предупреждение:</strong> Не пытайтесь задержать самостоятельно. 
                При обнаружении немедленно свяжитесь с правоохранительными органами.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WantedCriminalCard;
