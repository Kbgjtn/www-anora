import { JSX } from "react";

export type IconName =
  | "alternate_email"
  | "attachment"
  | "auto_renew"
  | "close"
  | "content_copy"
  | "exclamation"
  | "footprint"
  | "home"
  | "id_card"
  | "identity_platform"
  | "light_bulb"
  | "link"
  | "remove"
  | "report"
  | "search"
  | "sensors"
  | "settings"
  | "crop_19_6"
  | "aspect_ratio"
  | "favorite"
  | "bookmark"
  | "check"
  | "circle"
  | "check_small";

export type IconProps = React.SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = "currentColor",
  className,
  ...svgProps
}) => {
  const icons: Record<
    IconProps["name"],
    (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  > = {
    home: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={color}
        viewBox="0 0 24 24"
        className={className}
        {...props}
      >
        <path d="M3 9.5L12 3l9 6.5V21H3V9.5z" />
      </svg>
    ),
    search: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={color}
        viewBox="0 0 24 24"
        className={className}
        {...props}
      >
        <path d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2z" />
      </svg>
    ),
    settings: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={color}
        viewBox="0 0 24 24"
        className={className}
        {...props}
      >
        <path d="M12 8a4 4 0 110 8 4 4 0 010-8zm0-6a2 2 0 012 2v1.05a8.001 8.001 0 014.95 4.95H20a2 2 0 012 2v0a2 2 0 01-2 2h-1.05a8.001 8.001 0 01-4.95 4.95V20a2 2 0 01-2 2v0a2 2 0 01-2-2v-1.05a8.001 8.001 0 01-4.95-4.95H4a2 2 0 01-2-2v0a2 2 0 012-2h1.05a8.001 8.001 0 014.95-4.95V4a2 2 0 012-2z" />
      </svg>
    ),
    alternate_email: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={color}
        viewBox="0 -960 960 960"
        className={className}
        {...props}
      >
        <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480v58q0 59-40.5 100.5T740-280q-35 0-66-15t-52-43q-29 29-65.5 43.5T480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480v58q0 26 17 44t43 18q26 0 43-18t17-44v-58q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93h200v80H480Zm0-280q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z" />
      </svg>
    ),
    id_card: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={color}
        viewBox="0 -960 960 960"
        className={className}
        {...props}
      >
        <path d="M560-440h200v-80H560v80Zm0-120h200v-80H560v80ZM200-320h320v-22q0-45-44-71.5T360-440q-72 0-116 26.5T200-342v22Zm160-160q33 0 56.5-23.5T440-560q0-33-23.5-56.5T360-640q-33 0-56.5 23.5T280-560q0 33 23.5 56.5T360-480ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z" />
      </svg>
    ),
    content_copy: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={color}
        viewBox="0 -960 960 960"
        className={className}
        {...props}
      >
        <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
      </svg>
    ),
    link: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={color}
        viewBox="0 -960 960 960"
        className={className}
        {...props}
      >
        <path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z" />
      </svg>
    ),
    footprint: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={color}
        viewBox="0 -960 960 960"
        className={className}
        {...props}
      >
        <path d="M260-840q-45 0-72.5 50T160-680q0 63 17.5 111.5T210-496l110-22q13-32 26.5-73t13.5-89q0-60-27.5-110T260-840Zm55 520q19 0 32-14t13-39q0-17-8-35t-16-32l-96 20q0 40 17.5 70t57.5 30Zm385-320q-45 0-72.5 50T600-480q0 48 13.5 88.5T640-318l110 22q15-24 32.5-72T800-480q0-60-27.5-110T700-640Zm-55 520q40 0 57.5-30t17.5-70l-96-20q-8 14-16 32t-8 35q0 20 12.5 36.5T645-120ZM315-240q-77 0-117-57t-38-128l-18-27q-11-17-36.5-77T80-680q0-103 51-171.5T260-920q85 0 132.5 75.5T440-680q0 58-16 107t-28 79l8 13q8 14 22 44.5t14 63.5q0 57-35.5 95T315-240ZM645-40q-54 0-89.5-38T520-173q0-33 14-63.5t22-44.5l8-13q-12-30-28-79t-16-107q0-89 47.5-164.5T700-720q78 0 129 68.5T880-480q0 91-25.5 150.5T818-253l-18 28q1 71-38.5 128T645-40Z" />
      </svg>
    ),
    identity_platform: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={color}
        viewBox="0 -960 960 960"
        className={className}
        {...props}
      >
        <path d="M480-440q-58 0-99-41t-41-99q0-58 41-99t99-41q58 0 99 41t41 99q0 58-41 99t-99 41Zm0-80q25 0 42.5-17.5T540-580q0-25-17.5-42.5T480-640q-25 0-42.5 17.5T420-580q0 25 17.5 42.5T480-520Zm0 460L120-280v-400l360-220 360 220v400L480-60Zm0-93 147-91q-34-18-71.5-27t-75.5-9q-38 0-75.5 9T333-244l147 91ZM256-291q50-34 107-51.5T480-360q60 0 117 17.5T704-291l56-33v-311L480-806 200-635v311l56 33Zm224-189Z" />
      </svg>
    ),
    auto_renew: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={color}
        viewBox="0 -960 960 960"
        className={className}
        {...props}
      >
        <path d="M204-318q-22-38-33-78t-11-82q0-134 93-228t227-94h7l-64-64 56-56 160 160-160 160-56-56 64-64h-7q-100 0-170 70.5T240-478q0 26 6 51t18 49l-60 60ZM481-40 321-200l160-160 56 56-64 64h7q100 0 170-70.5T720-482q0-26-6-51t-18-49l60-60q22 38 33 78t11 82q0 134-93 228t-227 94h-7l64 64-56 56Z" />
      </svg>
    ),
    attachment: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={color}
        viewBox="0 -960 960 960"
        className={className}
        {...props}
      >
        <path d="M330-240q-104 0-177-73T80-490q0-104 73-177t177-73h370q75 0 127.5 52.5T880-560q0 75-52.5 127.5T700-380H350q-46 0-78-32t-32-78q0-46 32-78t78-32h370v80H350q-13 0-21.5 8.5T320-490q0 13 8.5 21.5T350-460h350q42-1 71-29.5t29-70.5q0-42-29-71t-71-29H330q-71-1-120.5 49T160-490q0 70 49.5 119T330-320h390v80H330Z" />
      </svg>
    ),
    exclamation: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={color}
        viewBox="0 -960 960 960"
        className={className}
        {...props}
      >
        <path d="M440-400v-360h80v360h-80Zm0 200v-80h80v80h-80Z" />
      </svg>
    ),
    remove: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={color}
        viewBox="0 -960 960 960"
        className={className}
        {...props}
      >
        <path d="M200-440v-80h560v80H200Z" />
      </svg>
    ),
    sensors: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={color}
        viewBox="0 -960 960 960"
        className={className}
        {...props}
      >
        <path d="M197-197q-54-55-85.5-127.5T80-480q0-84 31.5-156.5T197-763l57 57q-44 44-69 102t-25 124q0 67 25 125t69 101l-57 57Zm113-113q-32-33-51-76.5T240-480q0-51 19-94.5t51-75.5l57 57q-22 22-34.5 51T320-480q0 33 12.5 62t34.5 51l-57 57Zm170-90q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm170 90-57-57q22-22 34.5-51t12.5-62q0-33-12.5-62T593-593l57-57q32 32 51 75.5t19 94.5q0 50-19 93.5T650-310Zm113 113-57-57q44-44 69-102t25-124q0-67-25-125t-69-101l57-57q54 54 85.5 126.5T880-480q0 83-31.5 155.5T763-197Z" />
      </svg>
    ),
    light_bulb: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={color}
        viewBox="0 -960 960 960"
        className={className}
        {...props}
      >
        <path d="M480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-200v-80h320v80H320Zm10-120q-69-41-109.5-110T180-580q0-125 87.5-212.5T480-880q125 0 212.5 87.5T780-580q0 81-40.5 150T630-320H330Zm24-80h252q45-32 69.5-79T700-580q0-92-64-156t-156-64q-92 0-156 64t-64 156q0 54 24.5 101t69.5 79Zm126 0Z" />
      </svg>
    ),
    report: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={color}
        viewBox="0 -960 960 960"
        className={className}
        {...props}
      >
        <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240ZM330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm34-80h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z" />
      </svg>
    ),
    close: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={color}
        viewBox="0 -960 960 960"
        className={className}
        {...props}
      >
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
      </svg>
    ),
    check_small: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={color}
        viewBox="0 -960 960 960"
        className={className}
        {...props}
      >
        <path d="M400-318 247-471l42-42 111 111 271-271 42 42-313 313Z" />
      </svg>
    ),
    aspect_ratio: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={color}
        viewBox="0 -960 960 960"
        className={className}
        {...props}
      >
        <path d="M560-280h200v-200h-80v120H560v80ZM200-480h80v-120h120v-80H200v200Zm-40 320q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z" />
      </svg>
    ),
    crop_19_6: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={color}
        viewBox="0 -960 960 960"
        className={className}
        {...props}
      >
        <path d="M200-280q-33 0-56.5-23.5T120-360v-240q0-33 23.5-56.5T200-680h560q33 0 56.5 23.5T840-600v240q0 33-23.5 56.5T760-280H200Zm0-80h560v-240H200v240Zm0 0v-240 240Z" />
        <path d="M200-280q-33 0-56.5-23.5T120-360v-240q0-33 23.5-56.5T200-680h560q33 0 56.5 23.5T840-600v240q0 33-23.5 56.5T760-280H200Zm0-80h560v-240H200v240Zm0 0v-240 240Z" />
      </svg>
    ),
    favorite: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={color}
        viewBox="0 -960 960 960"
        {...props}
        className={className}
      >
        <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
      </svg>
    ),

    bookmark: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={color}
        viewBox="0 -960 960 960"
        stroke="currentColor"
        className={className}
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m305-704 112-145q12-16 28.5-23.5T480-880q18 0 34.5 7.5T543-849l112 145 170 57q26 8 41 29.5t15 47.5q0 12-3.5 24T866-523L756-367l4 164q1 35-23 59t-56 24q-2 0-22-3l-179-50-179 50q-5 2-11 2.5t-11 .5q-32 0-56-24t-23-59l4-165L95-523q-8-11-11.5-23T80-570q0-25 14.5-46.5T135-647l170-57Zm49 69-194 64 124 179-4 191 200-55 200 56-4-192 124-177-194-66-126-165-126 165Zm126 135Z"
        />
      </svg>
    ),

    check: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={color}
        viewBox="0 -960 960 960"
        stroke="currentColor"
        className={className}
        {...props}
      >
        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
      </svg>
    ),

    circle: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={color}
        viewBox="0 -960 960 960"
        stroke="currentColor"
        className={className}
        {...props}
      >
        <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
      </svg>
    ),
  };

  const SvgIcon = icons[name];

  return SvgIcon({
    width: size,
    height: size,
    fill: color,
    ...svgProps,
  });
};
