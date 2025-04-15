"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function Home() {
	const constaintRef = useRef<HTMLDivElement>(null);
	const [items, setItems] = useState<{ id: number; zIndex: number; color: string }[]>(
		Array.from({ length: 3 }, (_, index) => {
			return {
				id: index,
				zIndex: index + 1,
				color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
			};
		})
	);

	const [dragValue, setDragValue] = useState(0);

	return (
		<div className="flex justify-center w-full min-h-screen items-center">
			<div className="grid gap-2" ref={constaintRef}>
				{items.map((item, index) => {
					return (
						<Item
							constaintRef={constaintRef}
							item={item}
							index={index}
							key={item.id}
							isDraggable={index === items.length - 1}
							dragValue={dragValue}
							onChangeSort={() => {
								const temp = [...items];
								const tempItem = temp[index];
								temp.pop();
								temp.unshift(tempItem);
								setItems(temp);
							}}
							onSaveDragValue={(x) => {
								setDragValue(x);
							}}
						/>
					);
				})}
			</div>
		</div>
	);
}

function Item({
	item,
	index,
	constaintRef,
	onChangeSort,
	onSaveDragValue,
	isDraggable,
	dragValue,
}: {
	item: { id: number; zIndex: number; color: string };
	index: number;
	onChangeSort: () => void;
	onSaveDragValue: (x: number) => void;
	constaintRef: React.RefObject<HTMLDivElement>;
	isDraggable: boolean;
	dragValue: number;
}) {
	let itemScale = 1;
	let itemX = 0;
	let itemRotate = 0;
	if (index === 0) {
		console.log({ dragValue });
		if (Math.abs(dragValue) > 0) {
			const temp = Math.abs(dragValue) > 200 ? 200 : Math.abs(dragValue);
			// drag value is from 0 to 200px
			// scale should respect that ratio from 0.9 to 1
			itemScale = 0.9 + (temp / 200) * 0.1;
		} else {
			itemScale = 0.9;
		}
		itemX = 100;
		itemRotate = -3;
	}
	if (index === 1) {
		if (Math.abs(dragValue) > 0) {
			const temp = Math.abs(dragValue) > 125 ? 125 : Math.abs(dragValue);
			itemScale = 0.9 + (temp / 125) * 0.1;
		} else {
			itemScale = 0.9;
		}
		itemX = 80;
		itemRotate = 3;
	}
	if (index === 2) {
		itemScale = 1.1;
		itemX = 0;
		itemRotate = -3;
	}

	return (
		<motion.div
			key={item.id}
			className="bg-gray-50 aspect-[9/12] w-[350px] rounded-2xl text-black text-6xl 
    flex items-center justify-center row-span-full col-span-full
     relative overflow-hidden border-2 border-black"
			style={{
				filter: "drop-shadow(7px 5px 0px rgba(0,0,0,1))",
			}}
			animate={{
				scale: itemScale,
				x: itemX,
				rotate: itemRotate,
			}}
			transition={{
				duration: 0.5,
				ease: "linear",
			}}
			drag={isDraggable ? "x" : false}
			draggable={isDraggable}
			onDragEnd={(event, info) => {
				console.log(event, info);
				if (Math.abs(info.offset.x) > 200) {
					onChangeSort();
					onSaveDragValue(0);
				}
			}}
			onDrag={(event, info) => {
				if (isDraggable) {
					onSaveDragValue(info.offset.x);
				}
			}}
			dragConstraints={constaintRef}
			// dragElastic={0.5}
			// dragTransition={{
			// 	min: 0,
			// 	max: 100,
			// 	friction: 1,
			// }}
		>
			{/* random portrate image from internet */}
			<Image
				src={`https://picsum.photos/400/530?random=${item.id}`}
				alt="random image"
				fill
				className="object-cover pointer-events-none"
			/>
		</motion.div>
	);
}
