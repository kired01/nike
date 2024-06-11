import { ButtonGroup } from "@nextui-org/button"
import { Link } from "@nextui-org/link"
import { Skeleton } from "@nextui-org/skeleton"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import NextLink from "next/link"

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/shared/ui"

import type { ISliderData } from "../model/slider"

interface IProductCarouselSkeletonProps {
	isLoaded: boolean
	data: Partial<ISliderData>[] | undefined
}

interface IProductCarouselProps {
	isLoaded?: boolean
	data: ISliderData[] | undefined
}

export const ProductCarousel: React.FC<IProductCarouselProps | IProductCarouselSkeletonProps> = ({
	isLoaded = true,
	data,
}) => {
	return (
		<Carousel
			plugins={[
				Autoplay({
					delay: 3000,
					stopOnMouseEnter: true,
					stopOnInteraction: false,
				}),
			]}
			opts={{
				loop: true,
			}}
			className="container pt-[50px]">
			<Skeleton
				className="h-[595px]"
				isLoaded={isLoaded}>
				<CarouselContent className="ml-0">
					{data?.map((slider) => (
						<CarouselItem
							key={slider.id}
							className="relative h-[595px]">
							<Image
								src={slider.attributes?.picture.data.attributes.url ?? ""}
								alt={slider.attributes?.picture.data.attributes.alternativeText ?? "Sneakers"}
								width={1360}
								height={595}
								priority
							/>
							<Link
								as={NextLink}
								href={"/"}
								className="absolute bottom-[75px] z-20 bg-white px-[40px] py-[25px] font-oswald text-3xl font-medium uppercase">
								Shop Now
							</Link>
						</CarouselItem>
					))}
				</CarouselContent>
			</Skeleton>
			<ButtonGroup
				className="absolute bottom-0 right-[24px]"
				radius="none">
				<CarouselPrevious />
				<CarouselNext />
			</ButtonGroup>
		</Carousel>
	)
}
