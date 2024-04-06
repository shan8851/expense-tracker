run:
	pnpm run dev
i:
	pnpm i
lint:
	pnpm run lint
build:
	pnpm run build
clean:
	rm -rf node_modules
push-db:
	pnpm run push-db
generate:
	pnpm run generate
reset-db:
	pnpm run prisma-reset
prisma-studio:
	pnpm run prisma-studio
